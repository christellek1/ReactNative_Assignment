// src/screens/ProductDetailsScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native';
import { RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../../styles/Details';
import { useTheme } from '../context/ThemeContext';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface ProductDetailsScreenProps {
  route: ProductDetailsScreenRouteProp;
}

interface ProductImage {
  url: string;
  alt?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  images: ProductImage[];
  category?: string;
  stock?: number;
  rating?: number;
  reviews?: number;
  features?: string[];
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { theme, colors } = useTheme();
  const { productId } = route.params;
  const navigation = useNavigation();
  const accessToken = useAuthStore((state) => state.accessToken);

  // Get screen dimensions for image swiper
  const { width: screenWidth } = Dimensions.get('window');

  // State management
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({});

  const dynamicStyles = styles(colors);

  // Utility functions
  const isValidObjectId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  const formatPrice = (price: number | string | undefined | null): string => {
    if (price === undefined || price === null) return '0.00';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '0.00';
    return numPrice.toFixed(2);
  };

  const formatRating = (rating: number | string | undefined | null): string => {
    if (rating === undefined || rating === null) return '4.8';
    const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    if (isNaN(numRating)) return '4.8';
    return numRating.toFixed(1);
  };

  const safeNumber = (value: any, defaultValue: number = 0): number => {
    if (value === undefined || value === null) return defaultValue;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? defaultValue : num;
  };

  // Process images to ensure proper URLs
  const processImages = (images: any[]): ProductImage[] => {
    if (!Array.isArray(images) || images.length === 0) {
      return [{ url: 'https://via.placeholder.com/400x400?text=No+Image' }];
    }

    return images.map((img, index) => {
      let imageUrl = '';
      
      // Handle different image data structures
      if (typeof img === 'string') {
        imageUrl = img;
      } else if (img && typeof img === 'object') {
        imageUrl = img.url || img.src || img.image || img.path || '';
      }

      // Ensure the URL is properly formatted
      if (imageUrl && !imageUrl.startsWith('http')) {
        // If it's a relative path, prepend your base URL
        // Replace 'YOUR_BASE_URL' with your actual server base URL
        const baseUrl = axiosInstance.defaults.baseURL || 'YOUR_BASE_URL';
        imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
      }

      // Fallback to placeholder if no valid URL
      if (!imageUrl) {
        imageUrl = `https://via.placeholder.com/400x400?text=Image+${index + 1}`;
      }

      return {
        url: imageUrl,
        alt: img?.alt || `Product image ${index + 1}`
      };
    });
  };

  // Fetch product data
  const fetchProduct = useCallback(async (showLoading = true) => {
    // Validation checks
    if (!accessToken) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    if (!productId) {
      setError('Product ID is required.');
      setLoading(false);
      return;
    }

    if (showLoading) setLoading(true);
    setError(null);
    setImageLoadError({}); // Reset image errors

    try {
      console.log('Fetching product with ID:', productId);
      console.log('Using access token:', accessToken ? 'Present' : 'Missing');

      // Updated API endpoint - using /api/posts if that's your correct endpoint
      // Change this to match your actual product endpoint
      const endpoint = `/api/products/${productId}`;
      // If you're using posts endpoint, uncomment the line below:
      // const endpoint = `/api/posts/${productId}`;
      
      const response = await axiosInstance.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15 second timeout
      });

      console.log('API Response Status:', response.status);
      console.log('API Response Data:', JSON.stringify(response.data, null, 2));

      if (response.data) {
        // Handle both direct product data and nested data structures
        const productData = response.data.data || response.data.product || response.data;
        
        // Process the product data with better image handling
        const processedProduct: Product = {
          _id: productData._id || productData.id || productId,
          title: productData.title || productData.name || 'Unknown Product',
          description: productData.description || productData.content || 'No description available.',
          price: productData.price || 0,
          images: processImages(productData.images || productData.image || []),
          category: productData.category,
          stock: productData.stock,
          rating: productData.rating,
          reviews: productData.reviews,
          features: Array.isArray(productData.features) ? productData.features : undefined,
        };

        console.log('Processed product images:', processedProduct.images);
        setProduct(processedProduct);
        setActiveImageIndex(0);
      } else {
        setError('No product data received from server.');
      }
    } catch (err: any) {
      console.error('Full error object:', err);
      
      let errorMessage = 'Failed to fetch product details.';

      if (err.response) {
        console.error('Error response status:', err.response.status);
        console.error('Error response data:', err.response.data);
        
        const status = err.response.status;
        const data = err.response.data;

        switch (status) {
          case 400:
            errorMessage = 'Invalid request. Please check the product ID.';
            break;
          case 401:
            errorMessage = 'Authentication failed. Please log in again.';
            break;
          case 403:
            errorMessage = 'Access denied. You don\'t have permission to view this product.';
            break;
          case 404:
            errorMessage = 'Product not found. It may have been removed or the ID is incorrect.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = data?.message || data?.error || `Server error (${status})`;
        }
      } else if (err.request) {
        console.error('Network error - no response received');
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. The server is taking too long to respond.';
      } else {
        console.error('Error message:', err.message);
        errorMessage = err.message || 'An unexpected error occurred.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [productId, accessToken]);

  // Initial load
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (!product && !loading && !error) {
        fetchProduct();
      }
    }, [product, loading, error, fetchProduct])
  );

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProduct(false);
  }, [fetchProduct]);

  // Handle image load errors
  const handleImageError = (index: number) => {
    console.error(`Image failed to load at index ${index}:`, product?.images[index]?.url);
    setImageLoadError(prev => ({ ...prev, [index]: true }));
  };

  // Handle scroll for image swiper
  const handleImageScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(scrollPosition / screenWidth);
    setActiveImageIndex(imageIndex);
  };

  // Render individual image item for swiper
  const renderImageItem = ({ item, index }: { item: ProductImage; index: number }) => {
    const imageUrl = imageLoadError[index] 
      ? 'https://via.placeholder.com/400x400?text=Image+Not+Available'
      : item.url;

    return (
      <View style={{ width: screenWidth }}>
        <Image
          source={{ uri: imageUrl }}
          style={[dynamicStyles.productImage, { width: screenWidth - 32, alignSelf: 'center' }]}
          resizeMode="cover"
          onError={() => handleImageError(index)}
          onLoad={() => {
            console.log('Image loaded successfully:', imageUrl);
          }}
        />
      </View>
    );
  };

  // Share functionality
  const onShare = async () => {
    if (!product) return;
    
    try {
      const shareContent = {
        message: `Check out ${product.title}!\n\nPrice: $${formatPrice(product.price)}\n\n${product.description}`,
      };
      
      await Share.share(shareContent);
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  // Add to cart functionality
const addToCart = () => {
  if (!product) return;

  useCartStore.getState().addToCart({
    _id: product._id,
    title: product.title,
    price: safeNumber(product.price),
    image: product.images[0]?.url || '',
    quantity,
  });

};

  // Quantity handlers
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    const maxQuantity = safeNumber(product?.stock, 99);
    setQuantity(prev => Math.min(maxQuantity, prev + 1));
  };

  // Loading state
  if (loading) {
    return (
      <View style={dynamicStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[dynamicStyles.notFoundText, { marginTop: 16, fontSize: 16, opacity: 0.7 }]}>
          Loading product details...
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={dynamicStyles.centered}>
        <Text style={dynamicStyles.notFoundText}>{error}</Text>
        <View style={{ flexDirection: 'row', marginTop: 20, gap: 16 }}>
          <TouchableOpacity
            onPress={() => fetchProduct()}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              borderColor: colors.primary,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <View style={dynamicStyles.centered}>
        <Text style={dynamicStyles.notFoundText}>Product not found.</Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 16,
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main render
  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity 
          style={dynamicStyles.headerButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={dynamicStyles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <TouchableOpacity style={dynamicStyles.headerButton} onPress={onShare}>
          <Text style={dynamicStyles.headerButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyles.scrollContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Image Section */}
        <View style={dynamicStyles.imageContainer}>
          {product.images && product.images.length > 0 ? (
            <>
              <FlatList
                data={product.images}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => `image-${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleImageScroll}
                scrollEventThrottle={16}
                style={{ height: 300 }}
              />
              
              {product.images.length > 1 && (
                <View style={dynamicStyles.imageDots}>
                  {product.images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        dynamicStyles.dot,
                        activeImageIndex === index && dynamicStyles.activeDot
                      ]}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={[
              dynamicStyles.productImage, 
              { 
                backgroundColor: colors.background, 
                justifyContent: 'center', 
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border || '#E0E0E0',
                width: screenWidth - 32,
                alignSelf: 'center'
              }
            ]}>
              <Text>
                No Image Available
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={dynamicStyles.infoCard}>
          <View style={dynamicStyles.titleRow}>
            <Text style={dynamicStyles.productTitle}>{product.title}</Text>
            <View style={dynamicStyles.priceTag}>
              <Text style={dynamicStyles.priceText}>
                ${formatPrice(product.price)}
              </Text>
            </View>
          </View>

          {/* Rating Section */}
          <View style={dynamicStyles.ratingRow}>
            <View style={dynamicStyles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  style={[
                    dynamicStyles.starIcon,
                    { color: star <= safeNumber(product.rating, 4.8) ? '#FFD700' : '#DDD' }
                  ]}
                >
                  ★
                </Text>
              ))}
              <Text style={dynamicStyles.ratingText}>
                {formatRating(product.rating)}
              </Text>
            </View>
            <Text style={dynamicStyles.reviewText}>
              ({safeNumber(product.reviews, 12)} reviews)
            </Text>
          </View>

          <View style={dynamicStyles.divider} />

          {/* Description */}
          <Text style={dynamicStyles.sectionTitle}>About this product</Text>
          <Text style={dynamicStyles.productDescription}>
            {product.description}
          </Text>

          {/* Features */}
          <Text style={dynamicStyles.sectionTitle}>Key Features</Text>
          <View style={dynamicStyles.featuresList}>
            {product.features && product.features.length > 0 ? (
              product.features.map((feature, index) => (
                <View key={index} style={dynamicStyles.featureItem}>
                  <Text style={dynamicStyles.checkmarkIcon}>✓</Text>
                  <Text style={dynamicStyles.featureText}>{feature}</Text>
                </View>
              ))
            ) : (
              <>
                <View style={dynamicStyles.featureItem}>
                  <Text style={dynamicStyles.checkmarkIcon}>✓</Text>
                  <Text style={dynamicStyles.featureText}>Premium quality materials</Text>
                </View>
                <View style={dynamicStyles.featureItem}>
                  <Text style={dynamicStyles.checkmarkIcon}>✓</Text>
                  <Text style={dynamicStyles.featureText}>30-day money back guarantee</Text>
                </View>
                <View style={dynamicStyles.featureItem}>
                  <Text style={dynamicStyles.checkmarkIcon}>✓</Text>
                  <Text style={dynamicStyles.featureText}>Free shipping on orders over $50</Text>
                </View>
              </>
            )}
          </View>

          {/* Stock info */}
          {product.stock !== undefined && product.stock !== null && (
            <View style={{ marginTop: 16, padding: 12, backgroundColor: colors.background, borderRadius: 8 }}>
              <Text style={[
                dynamicStyles.sectionTitle, 
                { 
                  fontSize: 14,
                  color: safeNumber(product.stock) > 0 ?  '#4CAF50' : '#F44336'
                }
              ]}>
                {safeNumber(product.stock) > 0 
                  ? `✓ ${safeNumber(product.stock)} in stock` 
                  : '✗ Out of stock'
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={dynamicStyles.footer}>
        <View style={dynamicStyles.quantityContainer}>
          <TouchableOpacity 
            style={[
              dynamicStyles.qtyBtn,
              { opacity: quantity <= 1 ? 0.5 : 1 }
            ]}
            onPress={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Text style={dynamicStyles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={dynamicStyles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={[
              dynamicStyles.qtyBtn,
              { opacity: quantity >= safeNumber(product.stock, 99) ? 0.5 : 1 }
            ]}
            onPress={increaseQuantity}
            disabled={quantity >= safeNumber(product.stock, 99)}
          >
            <Text style={dynamicStyles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            dynamicStyles.addToCartButton,
            {
              opacity: (addingToCart || (product.stock !== undefined && safeNumber(product.stock) <= 0)) ? 0.6 : 1
            }
          ]} 
          onPress={addToCart}
          disabled={addingToCart || (product.stock !== undefined && safeNumber(product.stock) <= 0)}
        >
          {addingToCart ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={dynamicStyles.addToCartText}>
              {product.stock !== undefined && safeNumber(product.stock) <= 0 
                ? 'Out of Stock' 
                : 'Add to Cart'
              }
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;