import React from 'react';
import CustomTextInput from '../../atoms/CustomTextInput';
import PasswordInput from '../../atoms/Password';
import { AuthFormProps } from './AuthForm.types';

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  inputContainerStyle,
  inputStyle,
  toggleTextContainerStyle,
  toggleTextStyle,
}) => (
  <>
    <CustomTextInput
      containerStyle={inputContainerStyle}
      style={inputStyle}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />
    
    <PasswordInput
      value={password}
      onChangeText={setPassword}
      showPassword={showPassword}
      toggleShowPassword={() => setShowPassword(!showPassword)}
      containerStyle={inputContainerStyle}
      inputStyle={inputStyle}
      toggleStyle={toggleTextContainerStyle}
      toggleTextStyle={toggleTextStyle}
    />
  </>
);

export default AuthForm;
