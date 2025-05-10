import React from 'react';
import { View, Text } from 'react-native';
import CustomImage from '../../atoms/Image';
import { AuthHeaderProps } from './AuthHeader.types';

const AuthHeader: React.FC<AuthHeaderProps> = ({
  imageSource,
  title,
  logoStyle,
  fallbackStyle,
  titleStyle,
}) => (
  <View>
    <CustomImage 
      source={imageSource} 
      style={logoStyle} 
      fallbackStyle={fallbackStyle} 
    />
    <Text style={titleStyle}>{title}</Text>
  </View>
);

export default AuthHeader;
