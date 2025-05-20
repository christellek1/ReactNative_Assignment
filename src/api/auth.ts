// src/api/auth.ts
import axiosInstance from './axiosInstance';
import {
  SignUpData,
  LoginData,
  TokenResponse,
  ApiResponse,
} from '../types';
import { useAuthStore } from '../store/authStore'; // adjust path if needed

// Sign Up
export const signUp = async (
  formData: FormData
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<{ message: string }>>(
      '/api/auth/signup',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Sign up failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Sign up failed');
  }
};

// Verify OTP
export const verifyOtp = async (
  data: { email: string; otp: string }
): Promise<ApiResponse<{ message: string; isEmailVerified: boolean }>> => {
  try {
    const response = await axiosInstance.post<
      ApiResponse<{ message: string; isEmailVerified: boolean }>
    >('/api/auth/verify-otp', data);
    return response.data;
  } catch (error: any) {
    console.error('Verify OTP failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};

// Login

export const loginApi = async (
  email: string,
  password: string,
  tokenExpiresIn?: string
) => {
  try {
    console.log('Starting login with email:', email);

    // Prepare body with optional token_expires_in
    const body: { email: string; password: string; token_expires_in?: string } = {
      email,
      password,
    };
    if (tokenExpiresIn) {
      body.token_expires_in = tokenExpiresIn;
    }

    // Use correct path as per spec (no /api prefix)
    const response = await axiosInstance.post('/api/auth/login', body);

    console.log('Login response status:', response.status);
    console.log('Login response data:', response.data);

    const tokens = response.data?.data;
    console.log('Extracted tokens:', tokens);

    if (!tokens) {
      console.error('No tokens object found in response.data.data');
      throw new Error('Tokens missing from response');
    }
    if (!tokens.accessToken) {
      console.error('No accessToken found in tokens');
      throw new Error('Access token missing');
    }

    const { setTokens } = useAuthStore.getState();
    setTokens(tokens.accessToken, tokens.refreshToken ?? '');

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;

    console.log('Tokens saved to store and axios header set');
    return tokens;

  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
  }
};


// Refresh Token
export const refreshToken = async (
  refreshToken: string
): Promise<ApiResponse<TokenResponse>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
      '/auth/refresh-token',
      { refreshToken }
    );
    return response.data;
  } catch (error: any) {
    console.error('Refresh token failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to refresh token');
  }
};

// Resend OTP
export const resendOtpApi = async (email: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/resend-verification-otp', {
      email,
    });

    return response.data;
  } catch (error: any) {
    console.error('Resend OTP failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to resend OTP');
  }
};
