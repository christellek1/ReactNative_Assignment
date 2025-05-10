import { ThemeColors, Theme } from '../../../../context/ThemeContext';

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: { url: string }[];
}

export interface ProductCardProps {
  item: Product;
  navigation: any;
  toggleFavorite: (id: string) => void;
  isFavorite: boolean;
  colors: ThemeColors;
  theme: Theme;
}