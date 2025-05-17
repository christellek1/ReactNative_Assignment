// src/types/index.ts

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  // Add more fields if needed
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
