import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface KeypadButtonProps {
  digit: string;
  onPress: (digit: string) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const KeypadButton: React.FC<KeypadButtonProps> = ({
  digit,
  onPress,
  buttonStyle,
  textStyle,
}) => (
  <TouchableOpacity
    style={buttonStyle}
    onPress={() => onPress(digit)}
  >
    <Text style={textStyle}>{digit}</Text>
  </TouchableOpacity>
);

export default KeypadButton;