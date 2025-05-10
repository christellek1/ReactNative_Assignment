import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { SignUpSocialIconProps } from './SignUpSocialIcon.types';

export const SignUpSocialIcon: React.FC<SignUpSocialIconProps> = ({
  source,
  onPress,
  style,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={source} style={style.icon} />
  </TouchableOpacity>
);
