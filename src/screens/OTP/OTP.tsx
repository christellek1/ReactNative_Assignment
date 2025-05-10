import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import OTPOrganism from '../../components/organism/OTPorganism';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const OTPScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <OTPOrganism 
      navigation={navigation}
      onSuccess={() => console.log('OTP verification successful')} // Optional callback
    />
  );
};

export default OTPScreen;