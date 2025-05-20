import { z } from 'zod';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must only contain digits'),
});

export type FormData = z.infer<typeof otpSchema>;


export type OTPOrganismProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OTP'>;
  onSuccess?: () => void;
  email: string;
};

