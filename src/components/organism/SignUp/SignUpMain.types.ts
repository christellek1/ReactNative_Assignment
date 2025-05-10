export interface SignUpMainProps {
  style: any;
  errors: any;
  setValue: any;
  agree: boolean;
  setAgree: (value: boolean) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNavigateToLogin: () => void;
}
