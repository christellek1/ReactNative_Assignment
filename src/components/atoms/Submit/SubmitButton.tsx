import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SubmitButtonProps } from './SubmitButton.types';

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isActive,
  onPress,
  activeButtonStyle,
  inactiveButtonStyle,
  activeTextStyle,
  inactiveTextStyle,
}) => (
  <TouchableOpacity
    style={isActive ? activeButtonStyle : inactiveButtonStyle}
    onPress={onPress}
    disabled={!isActive}
  >
    <Text style={isActive ? activeTextStyle : inactiveTextStyle}>
      Submit
    </Text>
  </TouchableOpacity>
);

export default SubmitButton;
