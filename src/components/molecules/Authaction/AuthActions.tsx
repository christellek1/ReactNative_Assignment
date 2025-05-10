import React from 'react';
import CustomButton from '../../atoms/Button';
import TextLink from '../../atoms/Link';
import { AuthActionsProps } from './AuthActions.types';

const AuthActions: React.FC<AuthActionsProps> = ({
  onLogin,
  onSignupPress,
  loginButtonStyle,
  buttonTextStyle,
  signupContainerStyle,
  signupTextStyle,
  signupLinkStyle,
}) => (
  <>
    <CustomButton
      onPress={onLogin}
      title="Login"
      style={loginButtonStyle}
      textStyle={buttonTextStyle}
    />
    
    <TextLink
      text="Don't have an account? "
      linkText="Sign up"
      onPress={onSignupPress}
      textStyle={signupTextStyle}
      linkStyle={signupLinkStyle}
      containerStyle={signupContainerStyle}
    />
  </>
);

export default AuthActions;
