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
  >('/auth/verify-otp', data);
  return response.data;
};

// Login
export const loginApi = async (email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await axiosInstance.post('/api/auth/login', {
    email,
    password,
    token_expires_in: '1y' // based on your Postman test
  });

  if (response.data.success) {
    return response.data.data; // contains accessToken and refreshToken
  } else {
    throw new Error('Login failed');
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
