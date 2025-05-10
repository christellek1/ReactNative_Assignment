export interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  containerStyle?: any;
  inputStyle?: any;
  toggleStyle?: any;
  toggleTextStyle?: any;
}
