import React from 'react';
import { View, Text, Image } from 'react-native';
import { CustomImageProps } from './CustomImage.types';

const CustomImage: React.FC<CustomImageProps> = ({ source, style, fallbackStyle }) => {
  return source ? (
    <Image
      source={source}
      style={style}
      resizeMode="contain"
      onError={() => console.log('Failed to load image')}
    />
  ) : (
    <View style={[style, fallbackStyle]}>
      <Text>Logo</Text>
    </View>
  );
};

export default CustomImage;
