export interface SignUpInputFieldProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  error?: string;
  style: any;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'words';
}
