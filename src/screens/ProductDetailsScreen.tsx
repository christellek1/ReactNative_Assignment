// src/screens/ProductDetailsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  StatusBar,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import styles from '../../styles/Details';
import { useTheme } from '../context/ThemeContext';

const productsData = require('../Products.json');

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
interface ProductDetailsScreenProps {
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { theme, colors } = useTheme();
  const { productId } = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = productsData.data.find((item: any) => item._id === productId);

  const dynamicStyles = styles(colors);

  if (!product) {
    return (
      <View style={dynamicStyles.centered}>
        <Text style={dynamicStyles.notFoundText}>Product not found.</Text>
      </View>
    );
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${product.title} - ${product.description}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

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