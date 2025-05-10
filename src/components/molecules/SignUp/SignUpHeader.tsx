import React from 'react';
import { Text, View } from 'react-native';
import { normalize } from '../../../utils/normalize';

interface SignUpHeaderProps {
  style: any;
}

export const SignUpHeader: React.FC<SignUpHeaderProps> = ({ style }) => (
  <View>
    <Text style={style.title}>Create Account</Text>
    <Text style={style.subtitle}>
      Fill your information below or register with your social account
    </Text>
  </View>
);