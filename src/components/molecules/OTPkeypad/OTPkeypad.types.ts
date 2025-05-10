import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface OTPKeypadProps {
  onPress: (digit: string) => void;
  keypadStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
}
