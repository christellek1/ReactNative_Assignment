import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from '../../styles/SignUpStyle';
import SignUpMain from '../components/organism/SignUp';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../api/axiosInstance';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
});

type SignUpFormData = z.infer<typeof schema>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setTokens = useAuthStore(state => state.setTokens);

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
      console.log(' Submitting form with:', data);
      setIsSubmitting(true);
      console.log(' Sending request to /api/auth/signup');

      const response = await axiosInstance.post('/api/auth/signup', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      const result = response.data;

      console.log(' Signup success:', result);

      if (result.success && result.data) {
        // Save tokens if returned after signup
        const { accessToken, refreshToken } = result.data;
        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
        }

        // Navigate to OTP verification screen passing the email
        navigation.navigate('OTP', { email: data.email });
      } else {
        Alert.alert('Signup Failed', 'Unexpected response from server.');
      }
    } catch (error: any) {
      console.error(' Signup error:', error?.response?.data || error);
      Alert.alert('Error', error?.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log(' Done submitting');
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Auth');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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
