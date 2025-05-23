import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, theme: string) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 20,
      backgroundColor: colors.background,
      flexGrow: 1,
      paddingBottom: 80,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginVertical: 20,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: theme === 'light' ? 0.1 : 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    label: {
      fontSize: 16,
      marginBottom: 6,
      color: colors.text,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      marginBottom: 12,
      color: colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    error: {
      color: colors.error,
      fontSize: 14,
      marginBottom: 12,
    },
    imagePickerButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      marginBottom: 12,
    },
    imagePickerButtonText: {
      color: colors.text,
      fontSize: 16,
    },
    imagePreviewContainer: {
      marginBottom: 16,
    },
    imagePreview: {
      position: 'relative',
      marginRight: 10,
    },
    previewImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    removeImageButton: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: 'red',
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeImageText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    map: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
