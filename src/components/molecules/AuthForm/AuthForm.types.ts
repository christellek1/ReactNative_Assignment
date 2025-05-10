export interface AuthFormProps {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  inputContainerStyle: any;
  inputStyle: any;
  toggleTextContainerStyle: any;
  toggleTextStyle: any;
}
