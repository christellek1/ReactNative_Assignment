
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface KeypadButtonProps {
  digit: string;
  onPress: (digit: string) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
