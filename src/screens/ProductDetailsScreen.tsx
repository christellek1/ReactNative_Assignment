// src/screens/ProductDetailsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../../styles/Details';
import { useTheme } from '../context/ThemeContext';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../store/authStore';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface ProductDetailsScreenProps {
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { theme, colors } = useTheme();
  const { productId } = route.params;
  const navigation = useNavigation();

  const accessToken = useAuthStore((state) => state.accessToken);

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dynamicStyles = styles(colors);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!accessToken) {
        setError('No access token. Please log in.');
        setLoading(false);
        return;
      }
      if (!productId) {
        setError('Invalid product ID.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log('Using token:', accessToken); // Debug: log token

        const response = await axiosInstance.get(`/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProduct(response.data);
      } catch (err: any) {
        console.error('API error status:', err.response?.status);
        console.error('API error response:', err.response?.data);
        setError(
          err.response?.data?.message ||
          err.response?.statusText ||
          'Failed to fetch product'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, accessToken]);

  const onShare = async () => {
    if (!product) return;
    try {
      await Share.share({
        message: `Check out this product: ${product.title} - ${product.description}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = () => {
    if (!product) return;
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  if (loading) {
    return (
      <View style={dynamicStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={dynamicStyles.centered}>
        <Text style={dynamicStyles.notFoundText}>{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, marginTop: 10 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={dynamicStyles.centered}>
        <Text style={dynamicStyles.notFoundText}>Product not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, marginTop: 10 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={dynamicStyles.header}>
        <TouchableOpacity style={dynamicStyles.headerButton} onPress={() => navigation.goBack()}>
          <Text style={dynamicStyles.headerButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>{product.title}</Text>
        <TouchableOpacity style={dynamicStyles.headerButton} onPress={onShare}>
          <Text style={dynamicStyles.headerButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={dynamicStyles.scrollContainer}>
        <View style={dynamicStyles.imageContainer}>
          <Image
            source={{ uri: product.images[activeImageIndex]?.url || product.images[0].url }}
            style={dynamicStyles.productImage}
            resizeMode="cover"
          />
          {product.images.length > 1 && (
            <View style={dynamicStyles.imageDots}>
              {product.images.map((_: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveImageIndex(index)}
                  style={[
                    dynamicStyles.dot,
                    activeImageIndex === index && dynamicStyles.activeDot
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={dynamicStyles.infoCard}>
          <View style={dynamicStyles.titleRow}>
            <Text style={dynamicStyles.productTitle}>{product.title}</Text>
            <View style={dynamicStyles.priceTag}>
              <Text style={dynamicStyles.priceText}>${product.price}</Text>
            </View>
          </View>

          <View style={dynamicStyles.ratingRow}>
            <View style={dynamicStyles.starsContainer}>
              <Text style={dynamicStyles.starIcon}>★</Text>
              <Text style={dynamicStyles.starIcon}>★</Text>
              <Text style={dynamicStyles.starIcon}>★</Text>
              <Text style={dynamicStyles.starIcon}>★</Text>
              <Text style={dynamicStyles.starIcon}>★</Text>
              <Text style={dynamicStyles.ratingText}>4.8</Text>
            </View>
            <Text style={dynamicStyles.reviewText}>(12 reviews)</Text>
          </View>

          <View style={dynamicStyles.divider} />
          <Text style={dynamicStyles.sectionTitle}>About this product</Text>
          <Text style={dynamicStyles.productDescription}>{product.description}</Text>

          <Text style={dynamicStyles.sectionTitle}>Key Features</Text>
          <View style={dynamicStyles.featuresList}>
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
          </View>
        </View>
      </ScrollView>

      <View style={dynamicStyles.footer}>
        <View style={dynamicStyles.quantityContainer}>
          <TouchableOpacity style={dynamicStyles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={dynamicStyles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={dynamicStyles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={dynamicStyles.qtyBtn} onPress={() => setQuantity(quantity + 1)}>
            <Text style={dynamicStyles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={dynamicStyles.addToCartButton} onPress={addToCart}>
          <Text style={dynamicStyles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
