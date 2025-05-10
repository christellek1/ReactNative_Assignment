// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTP';
import HomeScreen from './src/screens/HomeScreen';
import SignUp from './src/screens/SignUpScreen';
import ProductDetails from './src/screens/ProductDetailsScreen';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

// Define the RootStackParamList for type-safe navigation
export type RootStackParamList = {
  Auth: undefined;
  OTP: undefined;
  Home: undefined;
  SignUp: undefined;
  ProductDetails: { productId: string }; // Specify productId as a parameter
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
          options={{ headerShown: false }} // Hide the header for AuthScreen
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown: false }} // Hide the header for OTPScreen
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide the header for HomeScreen
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }} // Hide the header for SignUp screen
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }} // Hide the header for ProductDetails screen
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
