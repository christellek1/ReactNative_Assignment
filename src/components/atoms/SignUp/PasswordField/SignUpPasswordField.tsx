import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { SignUpPasswordFieldProps } from './SignUpPasswordField.types';

export const SignUpPasswordField: React.FC<SignUpPasswordFieldProps> = ({
  showPassword,
  togglePasswordVisibility,
  onChangeText,
  error,
  style,
}) => (
  <View style={style.inputWrapper}>
    <View style={style.passwordContainer}>
      <TextInput
        style={[style.input, style.passwordInput]}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry={!showPassword}
        onChangeText={onChangeText}
      />
      <TouchableOpacity 
        style={style.showHideButton} 
        onPress={togglePasswordVisibility}
      >
        <Text style={style.showHideText}>
          {showPassword ? 'HIDE' : 'SHOW'}
        </Text>
      </TouchableOpacity>
    </View>
    {error && <Text style={style.error}>{error}</Text>}
  </View>
);
