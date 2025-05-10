export interface SignUpPasswordFieldProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  onChangeText: (text: string) => void;
  error?: string;
  style: any;
}
