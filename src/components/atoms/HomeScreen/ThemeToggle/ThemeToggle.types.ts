import { ThemeColors, Theme } from '../../../../context/ThemeContext';

export interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}