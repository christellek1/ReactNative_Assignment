import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTP';
import HomeScreen from './src/screens/HomeScreen';
import SignUp from './src/screens/SignUpScreen';
import ProductDetails from './src/screens/ProductDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UploadImage from './src/screens/UploadImage'; 
import CartScreen from './src/screens/cartScreen';

import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

import Toast from 'react-native-toast-message'; 
import CustomToast from './src/components/molecules/CustomToast';

export type RootStackParamList = {
  Auth: undefined;
  OTP: { email: string };
  Home: undefined;
  SignUp: undefined;
  ProductDetails: { productId: string };
  ProfileScreen: undefined;
  UploadImage: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <CustomToast text1={text1} text2={text2} />
  ),
};

const linking = {
  prefixes: ['myshopapp://'], 
  config: {
    screens: {
      Auth: 'auth',
      OTP: 'otp/:email',
      Home: 'home',
      SignUp: 'signup',
      ProductDetails: 'product/:productId',
      ProfileScreen: 'profile',
      UploadImage: 'upload',
      Cart: 'cart',
    },
  },
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UploadImage" component={UploadImage} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
          <Toast config={toastConfig} position="top" />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
