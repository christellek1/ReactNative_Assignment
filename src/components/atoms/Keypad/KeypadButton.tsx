import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { KeypadButtonProps } from './KeypadButton.types';

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
