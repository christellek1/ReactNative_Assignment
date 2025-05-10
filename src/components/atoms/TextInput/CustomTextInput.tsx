import React from 'react';
import { View, TextInput } from 'react-native';
import { CustomTextInputProps } from './CustomTextInput.types';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <TextInput
        style={style}
        placeholderTextColor="#999"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
