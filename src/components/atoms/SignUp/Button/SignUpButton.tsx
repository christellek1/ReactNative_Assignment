import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SignUpButtonProps } from './SignUpBotton.types';

export const SignUpButton: React.FC<SignUpButtonProps> = ({
  isSubmitting,
  onPress,
  style,
}) => (
  <TouchableOpacity
    style={[style.button, isSubmitting && style.buttonDisabled]}
    onPress={onPress}
    disabled={isSubmitting}
  >
    <Text style={style.buttonText}>
      {isSubmitting ? 'Signing Up...' : 'Sign Up'}
    </Text>
  </TouchableOpacity>
);
