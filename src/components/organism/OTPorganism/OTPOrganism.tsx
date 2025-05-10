import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../../../../styles/OTPStyle';
import OTPForm from '../../molecules/OTPform';
import OTPKeypad from '../../molecules/OTPKeypad';
import SubmitButton from '../../atoms/Submit';
import { otpSchema, FormData, OTPOrganismProps } from './OTPOrganism.types';

const OTPOrganism: React.FC<OTPOrganismProps> = ({ navigation, onSuccess }) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' }
  });

  const otpValue = watch('otp');

  const handlePress = (digit: string) => {
    if (otpValue.length < 4) {
      setValue('otp', otpValue + digit, { shouldValidate: true });
    }
  };

  const handleDelete = () => {
    setValue('otp', otpValue.slice(0, -1), { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    navigation.navigate('Home');
    onSuccess?.();
    reset();
  };

  return (
    <View style={styles.container}>
      <OTPForm
        otpValue={otpValue}
        onDelete={handleDelete}
        errorMessage={errors.otp?.message}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.inputContainer}
        deleteButtonStyle={styles.deleteButton}
        deleteTextStyle={styles.deleteText}
        errorTextStyle={styles.errorText}
      />

      <OTPKeypad
        onPress={handlePress}
        keypadStyle={styles.keypad}
        rowStyle={styles.row}
        buttonStyle={styles.key}
        buttonTextStyle={styles.keyText}
      />

      <SubmitButton
        isActive={otpValue.length === 4}
        onPress={handleSubmit(onSubmit)}
        activeButtonStyle={[styles.submitButton, styles.activeSubmitButton]}
        inactiveButtonStyle={[styles.submitButton, styles.inactiveSubmitButton]}
        activeTextStyle={[styles.submitText, styles.activeSubmitText]}
        inactiveTextStyle={[styles.submitText, styles.inactiveSubmitText]}
      />
    </View>
  );
};

export default OTPOrganism;
