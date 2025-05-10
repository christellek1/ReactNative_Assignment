// utils/normalize.ts
import { Dimensions, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 375;

export const normalize = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};
