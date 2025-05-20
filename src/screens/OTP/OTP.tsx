import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import OTPOrganism from '../../components/organism/OTPorganism';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { resendOtpApi } from '../../api/auth';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTP'>;
type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;

const OTPScreen: React.FC = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const email = route.params?.email;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      console.warn('No email provided to OTPScreen via route.params');
      Alert.alert('Error', 'No email found for OTP verification. Please go back and try again.');
    } else {
      console.log('Email received in OTPScreen:', email);
    }
  }, [email]);

  const handleResendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Email is missing. Cannot resend OTP.');
      return;
    }

    try {
      setLoading(true);
      await resendOtpApi(email);
      Alert.alert('Success', 'OTP has been resent to your email.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {email ? (
        <>
          <OTPOrganism
            navigation={navigation}
            email={email}
            onSuccess={() => console.log('OTP verification successful')}
          />

          <TouchableOpacity
            style={styles.resendContainer}
            onPress={handleResendOtp}
            disabled={loading}
          >
            <Text style={[styles.resendText, loading && styles.disabled]}>
              {loading ? 'Resending...' : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>Missing email. Please return and try again.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
  disabled: {
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default OTPScreen;
