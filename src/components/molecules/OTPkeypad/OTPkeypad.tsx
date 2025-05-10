import React from 'react';
import { View } from 'react-native';
import KeypadButton from '../../atoms/Keypad';
import KeypadRow from '../../atoms/KeypadRow';
import { OTPKeypadProps } from './OTPkeypad.types';

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
