import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '../../../api/axiosInstance';
import styles from '../../../../styles/OTPStyle';
import OTPForm from '../../molecules/OTPform';
import OTPKeypad from '../../molecules/OTPKeypad';
import SubmitButton from '../../atoms/Submit';
import { otpSchema, FormData, OTPOrganismProps } from './OTPOrganism.types';

const OTPOrganism: React.FC<OTPOrganismProps & { initialOTP?: string }> = ({
  navigation,
  onSuccess,
  email,
  initialOTP,
}) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const [loading, setLoading] = useState(false);
  const [hasSubmittedInitialOTP, setHasSubmittedInitialOTP] = useState(false);

  const otpValue = watch('otp');

  console.log('Render OTPOrganism, current OTP value:', otpValue);
  console.log('Errors:', errors);
  console.log('Loading state:', loading);
  console.log('Initial OTP:', initialOTP);

  const onSubmit = async (data: FormData) => {
    console.log('onSubmit called with data:', data);
    if (!email) {
      console.log('No email provided, cannot verify OTP');
      Alert.alert('Email Missing', 'Email is required to verify OTP.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('Sending OTP verification request...');
      const response = await axiosInstance.post('/api/auth/verify-otp', {
        email,
        otp: data.otp,
      });

      console.log('Response from verify-otp:', response.data);

      if (response.data.success) {
        console.log('OTP verification successful!');
        onSuccess?.();
        navigation.navigate('Home');
        reset();
      } else {
        console.log('OTP verification failed: Invalid OTP');
        Alert.alert('Invalid OTP', 'Please enter the correct 6-digit OTP.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('Verification Failed', 'Unable to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered for initialOTP:', initialOTP, 'submitted:', hasSubmittedInitialOTP);
    if (initialOTP && initialOTP.length === 6 && !hasSubmittedInitialOTP) {
      setValue('otp', initialOTP, { shouldValidate: true });
      console.log('Auto submitting OTP from initialOTP prop:', initialOTP);
      onSubmit({ otp: initialOTP });
      setHasSubmittedInitialOTP(true);
    }
  }, [initialOTP, hasSubmittedInitialOTP]);

  const handlePress = (digit: string) => {
    console.log('handlePress called with digit:', digit);
    if (otpValue.length < 6) {
      setValue('otp', otpValue + digit, { shouldValidate: true });
      console.log('Updated OTP value:', otpValue + digit);
    }
  };

  const handleDelete = () => {
    console.log('handleDelete called');
    setValue('otp', otpValue.slice(0, -1), { shouldValidate: true });
    console.log('Updated OTP value after delete:', otpValue.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <OTPForm
        otpValue={otpValue}
        onDelete={handleDelete}
        errorMessage={errors.otp?.message}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.inputContainer}
        deleteButtonStyle={styles.deleteButton}
        deleteTextStyle={styles.deleteText}
        errorTextStyle={styles.errorText}
      />

      <OTPKeypad
        onPress={handlePress}
        keypadStyle={styles.keypad}
        rowStyle={styles.row}
        buttonStyle={styles.key}
        buttonTextStyle={styles.keyText}
      />

      <SubmitButton
        isActive={otpValue.length === 6 && !loading}
        onPress={handleSubmit(onSubmit)}
        activeButtonStyle={[styles.submitButton, styles.activeSubmitButton]}
        inactiveButtonStyle={[styles.submitButton, styles.inactiveSubmitButton]}
        activeTextStyle={[styles.submitText, styles.activeSubmitText]}
        inactiveTextStyle={[styles.submitText, styles.inactiveSubmitText]}
      />
    </View>
  );
};

export default OTPOrganism;
