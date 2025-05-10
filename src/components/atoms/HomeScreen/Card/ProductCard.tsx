import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { createStyles } from '../../../../../styles/HomeStyle';
import { ProductCardProps } from './ProductCard.types';

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  navigation,
  toggleFavorite,
  isFavorite,
  colors,
  theme,
}) => {
  const styles = createStyles(colors, theme);
  const cardWidth = (Dimensions.get('window').width - Dimensions.get('window').width * 0.1) / 2;

  return (
    <TouchableOpacity
      style={[styles.productCard, { width: cardWidth }]}
      onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.images[0].url }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item._id)}>
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>★★★★★</Text>
          <Text style={styles.ratingCount}>(12)</Text>
        </View>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};