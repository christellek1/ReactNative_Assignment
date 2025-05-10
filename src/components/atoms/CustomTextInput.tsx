import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: any;
}

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