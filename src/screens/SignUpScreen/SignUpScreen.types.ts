// src/screens/SignUpScreen/types.ts

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { z } from 'zod';

// Navigation Prop Type
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

// Form Data Type
export type SignUpFormData = z.infer<typeof schema>;

// Form Validation Schema using Zod
export const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
});
