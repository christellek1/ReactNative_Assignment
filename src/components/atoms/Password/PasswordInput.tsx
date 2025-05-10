import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CustomTextInput from '../CustomTextInput';
import { PasswordInputProps } from './PasswordInput.types';

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  showPassword,
  toggleShowPassword,
  containerStyle,
  inputStyle,
  toggleStyle,
  toggleTextStyle,
}) => {
  return (
    <View style={containerStyle}>
      <CustomTextInput
        style={inputStyle}
        placeholder="Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={toggleStyle}
        onPress={toggleShowPassword}
      >
        <Text style={toggleTextStyle}>
          {showPassword ? 'Hide' : 'Show'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
