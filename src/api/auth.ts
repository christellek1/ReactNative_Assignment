// src/api/auth.ts
import axiosInstance from './axiosInstance';
import {
  SignUpData,
  LoginData,
  TokenResponse,
  ApiResponse,
} from '../types';

// Sign Up
export const signUp = async (
  formData: FormData
): Promise<ApiResponse<{ message: string }>> => {
  const response = await axiosInstance.post<ApiResponse<{ message: string }>>(
    '/api/auth/signup',
    
    formData,
    
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  
  return response.data;
};

// Verify OTP
export const verifyOtp = async (
  data: { email: string; otp: string }
): Promise<ApiResponse<{ message: string; isEmailVerified: boolean }>> => {
  const response = await axiosInstance.post<
    ApiResponse<{ message: string; isEmailVerified: boolean }>
  >('/api/auth/verify-otp', data);
  return response.data;
};

// Login

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password,
    });

    const tokens = response.data?.data;

    if (!tokens?.accessToken) {
      throw new Error('No access token received');
    }

    // Set token in axios for future requests
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;

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
  const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
    '/auth/refresh-token',
    { refreshToken }
  );
  return response.data;
};


//refresh otp
export const resendOtpApi = async (email: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/resend-verification-otp', {
      email,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to resend OTP');
  }
};