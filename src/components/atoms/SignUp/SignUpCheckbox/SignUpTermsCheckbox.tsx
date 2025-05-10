import React from 'react';
import { View, Switch, Text } from 'react-native';
import { SignUpTermsCheckboxProps } from './SignUpTermsCheckbox.types';

export const SignUpTermsCheckbox: React.FC<SignUpTermsCheckboxProps> = ({
  agree,
  setAgree,
  style,
}) => (
  <View style={style.checkboxContainer}>
    <Switch value={agree} onValueChange={setAgree} />
    <Text style={style.terms}>
      By signing up, you agree to the{' '}
      <Text style={style.link}>Terms & Conditions</Text>.
    </Text>
  </View>
);
