// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTP';
import HomeScreen from './src/screens/HomeScreen';
import SignUp from './src/screens/SignUpScreen';
import ProductDetails from './src/screens/ProductDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UploadImage from './src/screens/UploadImage'; // PascalCase import

import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

export type RootStackParamList = {
  Auth: undefined;
  OTP: { email: string };
    Home: undefined;
  SignUp: undefined;
  ProductDetails: { productId: string };
  ProfileScreen: undefined;
  UploadImage: undefined; // PascalCase route name
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTP"
              component={OTPScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadImage"   
              component={UploadImage} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
