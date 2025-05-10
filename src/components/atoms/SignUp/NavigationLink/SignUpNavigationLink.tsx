import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SignUpNavigationLinkProps } from './SignUpNavigationLink.types';

export const SignUpNavigationLink: React.FC<SignUpNavigationLinkProps> = ({
  onPress,
  style,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={style.loginLink}>
      Already have an account?{' '}
      <Text style={[style.loginBold, style.underlined]}>Log in</Text>
    </Text>
  </TouchableOpacity>
);
