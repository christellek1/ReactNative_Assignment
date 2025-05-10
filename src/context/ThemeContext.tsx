// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  text: {
    dark: string;
    medium: string;
    light: string;
  };
  border: string;
  favorite: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primary: '#5B21B6',
  secondary: '#8B5CF6',
  accent: '#10B981',
  background: '#F5F3FF',
  cardBg: '#FFFFFF',
  text: {
    dark: '#1F2937',
    medium: '#4B5563',
    light: '#9CA3AF',
  },
  border: '#E5E7EB',
  favorite: '#F43F5E',
};

const darkColors: ThemeColors = {
  primary: '#8B5CF6',
  secondary: '#5B21B6',
  accent: '#10B981',
  background: '#1F1F1F',
  cardBg: '#2D2D2D',
  text: {
    dark: '#F3F4F6',
    medium: '#D1D5DB',
    light: '#9CA3AF',
  },
  border: '#374151',
  favorite: '#F43F5E',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};