import React from 'react';
import { ScrollView } from 'react-native';
import { SignUpHeader } from '../../molecules/SignUp/SignUpHeader';
import { SignUpForm } from '../../molecules/SignUp/SignUpForm';
import { SignUpSocialAuth } from '../../molecules/SignUp/SignUpSocialAuth';
import { SignUpButton } from '../../atoms/SignUp/Button';
import { SignUpNavigationLink } from '../../atoms/SignUp/NavigationLink';
import { SignUpMainProps } from './SignUpMain.types';

const SignUpMain: React.FC<SignUpMainProps> = ({
  style,
  errors,
  setValue,
  agree,
  setAgree,
  showPassword,
  togglePasswordVisibility,
  isSubmitting,
  onSubmit,
  onNavigateToLogin,
}) => (
  <ScrollView contentContainerStyle={style.container} keyboardShouldPersistTaps="handled">
    <SignUpHeader style={style} />

    <SignUpForm
      errors={errors}
      setValue={setValue}
      agree={agree}
      setAgree={setAgree}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      style={style}
    />

    <SignUpButton
      isSubmitting={isSubmitting}
      onPress={onSubmit}
      style={style}
    />

    <SignUpSocialAuth style={style} />

    <SignUpNavigationLink
      onPress={onNavigateToLogin}
      style={style}
    />
  </ScrollView>
);

export default SignUpMain;
