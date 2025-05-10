export interface OTPFormProps {
  otpValue: string;
  onDelete: () => void;
  errorMessage?: string;
  placeholderStyle?: any;
  containerStyle?: any;
  deleteButtonStyle?: any;
  deleteTextStyle?: any;
  errorTextStyle?: any;
}
