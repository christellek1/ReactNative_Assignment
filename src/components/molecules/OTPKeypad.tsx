import React from 'react';
import { View, StyleProp, ViewStyle,TextStyle } from 'react-native';
import KeypadButton from '../atoms/KeypadButton';
import KeypadRow from '../atoms/KeypadRow';

interface OTPKeypadProps {
  onPress: (digit: string) => void;
  keypadStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
}

const OTPKeypad: React.FC<OTPKeypadProps> = ({
  onPress,
  keypadStyle,
  rowStyle,
  buttonStyle,
  buttonTextStyle,

}) => {
  return (
    <View style={keypadStyle}>
      {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']].map((row, i) => (
        <KeypadRow key={`row-${i}`} rowStyle={rowStyle}>
          {row.map(digit => (
            <KeypadButton
              key={digit}
              digit={digit}
              onPress={onPress}
              buttonStyle={buttonStyle}
              textStyle={buttonTextStyle}
            />
          ))}
        </KeypadRow>
      ))}
      <KeypadRow rowStyle={rowStyle}>
        <KeypadButton
          digit="0"
          onPress={onPress}
          buttonStyle={buttonStyle}
          textStyle={buttonTextStyle}
        />
      </KeypadRow>
    </View>
  );
};

export default OTPKeypad;