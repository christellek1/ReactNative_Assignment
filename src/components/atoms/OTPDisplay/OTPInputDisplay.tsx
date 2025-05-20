import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OTPInputDisplayProps } from './OTPInputDisplay.types';

const OTPInputDisplay: React.FC<OTPInputDisplayProps> = ({
  otpValue,
  placeholderStyle,
  containerStyle,
  deleteButtonStyle,
  deleteTextStyle,
  onDelete,
}) => (
  <View style={containerStyle}>
    <Text style={placeholderStyle}>
      {otpValue.padEnd(6, '-')}
    </Text>
    {otpValue.length > 0 && (
      <TouchableOpacity
        style={deleteButtonStyle}
        onPress={onDelete}
      >
        <Text style={deleteTextStyle}>X</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default OTPInputDisplay;
