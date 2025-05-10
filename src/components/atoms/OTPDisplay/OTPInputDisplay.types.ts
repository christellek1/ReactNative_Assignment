import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface OTPInputDisplayProps {
  otpValue: string;
  placeholderStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  deleteButtonStyle?: StyleProp<ViewStyle>;
  deleteTextStyle?: StyleProp<TextStyle>;
  onDelete: () => void;
}
