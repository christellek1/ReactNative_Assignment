import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import styles from '../../../styles/SignUpStyle';
import  SignUpMain  from '../../components/organism/SignUp';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
});

type SignUpFormData = z.infer<typeof schema>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (!agree) {
      Alert.alert('Terms & Conditions', 'You must agree before signing up.');
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.navigate('OTP');
    } catch (error) {
      Alert.alert('Error', 'Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Auth');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SignUpMain
      style={styles}
      errors={errors}
      setValue={setValue}
      agree={agree}
      setAgree={setAgree}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onNavigateToLogin={handleNavigateToLogin}
    />
  );
};

export default SignUpScreen;