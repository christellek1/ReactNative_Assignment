import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface SubmitButtonProps {
  isActive: boolean;
  onPress: () => void;
  activeButtonStyle?: StyleProp<ViewStyle>;
  inactiveButtonStyle?: StyleProp<ViewStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
}
