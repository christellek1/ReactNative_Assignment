import React from 'react';
import { View, Alert } from 'react-native';
import styles from '../../../../styles/AuthStyle';
import { useAuth } from '../../../context/AuthContext';
import AuthHeader from '../../molecules/AuthHeader';
import AuthForm from '../../molecules/AuthForm';
import AuthActions from '../../molecules/Authaction';
import { AuthOrganismProps } from './AuthOrganism.types';

const AuthOrganism: React.FC<AuthOrganismProps> = ({ navigation, mainImage }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      navigation.navigate('Home'); // Or 'Dashboard', depending on your flow
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Invalid email or password');
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
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        toggleTextContainerStyle={styles.toggleTextContainer}
        toggleTextStyle={styles.toggleText}
      />

      <AuthActions
        onLogin={handleLogin}
        onSignupPress={() => navigation.navigate('SignUp')}
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
