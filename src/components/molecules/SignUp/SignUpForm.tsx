import React from 'react';
import { View } from 'react-native';
import { SignUpInputField } from '../../atoms/SignUp/InputField';
import { SignUpPasswordField } from '../../atoms/SignUp/PasswordField';
import { SignUpTermsCheckbox } from '../../atoms/SignUp/SignUpCheckbox';
import { normalize } from '../../../utils/normalize';

interface SignUpFormProps {
  errors: any;
  setValue: any;
  agree: boolean;
  setAgree: (value: boolean) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  style: any;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  errors,
  setValue,
  agree,
  setAgree,
  showPassword,
  togglePasswordVisibility,
  style,
}) => (
  <View style={{ marginTop: normalize(30) }}>
    <SignUpInputField
      placeholder="Name"
      onChangeText={(text) => setValue('name', text)}
      error={errors.name?.message}
      style={style}
      autoCapitalize="words"
    />

    <SignUpInputField
      placeholder="Email"
      onChangeText={(text) => setValue('email', text)}
      error={errors.email?.message}
      style={style}
      keyboardType="email-address"
    />

    <SignUpPasswordField
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      onChangeText={(text) => setValue('password', text)}
      error={errors.password?.message}
      style={style}
    />

    <SignUpInputField
      placeholder="Phone Number"
      onChangeText={(text) => setValue('phone', text)}
      error={errors.phone?.message}
      style={style}
      keyboardType="phone-pad"
    />

    <SignUpTermsCheckbox
      agree={agree}
      setAgree={setAgree}
      style={style}
    />
  </View>
);