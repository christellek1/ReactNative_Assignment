import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { SignUpInputFieldProps } from './SignUpInputField.types';

export const SignUpInputField: React.FC<SignUpInputFieldProps> = ({
  placeholder,
  onChangeText,
  error,
  style,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => (
  <View style={style.inputWrapper}>
    <TextInput
      style={style.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
    {error && <Text style={style.error}>{error}</Text>}
  </View>
);
