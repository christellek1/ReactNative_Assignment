// screens/AuthScreen/AuthScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/images';
import AuthOrganism from '../../components/organism/Authorganism';
import { ImageSourcePropType } from 'react-native';
import { AuthScreenNavigationProp } from './AuthScreen.types';

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const mainImage: ImageSourcePropType = images.Main1 ?? { uri: '' };

  return <AuthOrganism navigation={navigation} mainImage={mainImage} />;
};

export default AuthScreen;
