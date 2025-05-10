import { z } from 'zod';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

export const otpSchema = z.object({
  otp: z.string()
    .length(4, 'OTP must be exactly 4 digits')
    .regex(/^\d{4}$/, 'OTP must only contain digits'),
});

export type FormData = z.infer<typeof otpSchema>;

export interface OTPOrganismProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  onSuccess?: () => void;
}

