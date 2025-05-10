import { ThemeColors, Theme } from '../../../../context/ThemeContext';

export interface HomeHeaderProps {
  colors: ThemeColors;
  theme: Theme;
  showFavoritesOnly: boolean;
  toggleFavoritesView: () => void;
}