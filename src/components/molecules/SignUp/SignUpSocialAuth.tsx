import React from 'react';
import { View } from 'react-native';
import { SignUpDivider } from '../../atoms/SignUp/Divider';
import { SignUpSocialIcon } from '../../atoms/SignUp/SignUpIcon';
import Images from '../../../assets/images';

interface SignUpSocialAuthProps {
  style: any;
}

export const SignUpSocialAuth: React.FC<SignUpSocialAuthProps> = ({ style }) => (
  <>
    <SignUpDivider style={style} />
    
    <View style={style.socialIcons}>
      <SignUpSocialIcon source={Images.Google} style={style} />
      <SignUpSocialIcon source={Images.Facebook} style={style} />
      <SignUpSocialIcon source={Images.Apple} style={style} />
    </View>
  </>
);