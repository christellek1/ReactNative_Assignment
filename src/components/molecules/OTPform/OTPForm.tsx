import React from 'react';
import OTPInputDisplay from '../../atoms/OTPDisplay';
import ValidationErrorText from '../../atoms/ValidationErrorText';
import { OTPFormProps } from './OTPForm.types';

const OTPForm: React.FC<OTPFormProps> = ({
  otpValue,
  onDelete,
  errorMessage,
  placeholderStyle,
  containerStyle,
  deleteButtonStyle,
  deleteTextStyle,
  errorTextStyle,
}) => {
  return (
    <>
      <OTPInputDisplay
        otpValue={otpValue}
        placeholderStyle={placeholderStyle}
        containerStyle={containerStyle}
        deleteButtonStyle={deleteButtonStyle}
        deleteTextStyle={deleteTextStyle}
        onDelete={onDelete}
      />
      <ValidationErrorText 
        message={errorMessage} 
        textStyle={errorTextStyle} 
      />
    </>
  );
};

export default OTPForm;
