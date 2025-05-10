import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CustomButtonProps } from './CustomButton.types';

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
}) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

export default CustomButton;
