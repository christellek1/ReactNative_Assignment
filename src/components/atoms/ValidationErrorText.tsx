import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface ValidationErrorTextProps {
  message?: string;
  textStyle?: StyleProp<TextStyle>;
}

const ValidationErrorText: React.FC<ValidationErrorTextProps> = ({ message, textStyle }) => (
  message ? <Text style={textStyle}>{message}</Text> : null
);

export default ValidationErrorText;