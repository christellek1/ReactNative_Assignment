import React from 'react';
import { View, Alert } from 'react-native';
import styles from '../../../../styles/AuthStyle';
import { useAuthStore } from '../../../store/authStore';
import AuthHeader from '../../molecules/AuthHeader';
import AuthForm from '../../molecules/AuthForm';
import AuthActions from '../../molecules/Authaction';
import axiosInstance from '../../../api/axiosInstance'; // your custom axios instance
import { AuthOrganismProps } from './AuthOrganism.types';

const AuthOrganism: React.FC<AuthOrganismProps> = ({ navigation, mainImage }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const setTokens = useAuthStore((state) => state.setTokens);

  const handleLogin = async () => {
    console.log('Attempting login with:', { email, password });

    if (!email || !password) {
      console.log('Missing email or password.');
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      // Keep the /api prefix here as you requested
      const response = await axiosInstance.post('/api/auth/login', { email, password });

      console.log('Login response:', response.data);

      // Extract tokens from response.data.data (not response.data)
      const { accessToken, refreshToken } = response.data.data;

      if (!accessToken || !refreshToken) {
        throw new Error('Tokens missing from response');
      }

      setTokens(accessToken, refreshToken);

      console.log('Tokens saved to store:', { accessToken, refreshToken });

      navigation.navigate('Home');
    } catch (error) {
      console.log('Login failed:', error);
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'Invalid email or password'
      );
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        imageSource={mainImage}
        title="Login"
        logoStyle={styles.logo}
        fallbackStyle={styles.fallbackImage}
        titleStyle={styles.loginText}
      />

      <AuthForm
        email={email}
        setEmail={(text) => {
          console.log('Email input:', text);
          setEmail(text);
        }}
        password={password}
        setPassword={(text) => {
          console.log('Password input:', text);
          setPassword(text);
        }}
        showPassword={showPassword}
        setShowPassword={(val) => {
          console.log('Toggling password visibility:', val);
          setShowPassword(val);
        }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        toggleTextContainerStyle={styles.toggleTextContainer}
        toggleTextStyle={styles.toggleText}
      />

      <AuthActions
        onLogin={handleLogin}
        onSignupPress={() => {
          console.log('Navigating to SignUp');
          navigation.navigate('SignUp');
        }}
        loginButtonStyle={styles.loginButton}
        buttonTextStyle={styles.buttonText}
        signupContainerStyle={styles.signupContainer}
        signupTextStyle={styles.signupText}
        signupLinkStyle={styles.signupLink}
      />
    </View>
  );
};

export default AuthOrganism;
