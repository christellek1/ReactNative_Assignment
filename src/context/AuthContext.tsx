import React, { createContext, useContext, useState, ReactNode } from 'react';
import {  loginApi } from '../api/auth';  // your API login function import

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      // Pass email and password as two arguments
      const tokens = await loginApi(email, password);

      // tokens is { accessToken: string; refreshToken: string; }
      if (tokens.accessToken) {
        // Save tokens if you want, e.g., AsyncStorage.setItem(...)
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Login failed'
      );
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
