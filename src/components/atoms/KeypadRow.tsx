import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

interface KeypadRowProps {
  children: React.ReactNode;
  rowStyle?: StyleProp<ViewStyle>;
}

const KeypadRow: React.FC<KeypadRowProps> = ({ children, rowStyle }) => (
  <View style={rowStyle}>
    {children}
  </View>
);

export default KeypadRow;