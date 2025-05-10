import React from 'react';
import { Text } from 'react-native';
import { SignUpDividerProps } from './SignUpDivider.types';

export const SignUpDivider: React.FC<SignUpDividerProps> = ({ style }) => (
  <Text style={style.orText}>───────  or sign up with  ───────</Text>
);
