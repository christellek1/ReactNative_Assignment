import { StyleSheet } from 'react-native';


  const createStyles = (colors: any, theme: string) =>
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 80,
    },
    loadingText: {
      marginTop: 10,
      color: colors.text,
      fontSize: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    logoutButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.error,
      backgroundColor: 'transparent',
    },
    logoutButtonText: {
      color: colors.error,
      fontWeight: '600',
      fontSize: 14,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 30,
    },
    toggleButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.buttonBackground,
      borderRadius: 8,
    },
    activeButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.text,
      fontSize: 14,
    },
    activeButtonText: {
      color: '#fff',
    },
    form: {
      gap: 20,
      marginBottom: 30,
    },
    profileImageSection: {
      alignItems: 'center',
      marginBottom: 10,
    },
    profileImageContainer: {
      alignItems: 'center',
      gap: 12,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.inputBackground,
    },
    profileImagePlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImagePlaceholderText: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
    },
    changeImageButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.buttonBackground,
      borderRadius: 6,
      minHeight: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    changeImageButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '500',
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
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    disabledInput: {
      backgroundColor: colors.border + '20',
      opacity: 0.7,
    },
    helperText: {
      fontSize: 12,
      color: colors.text + '80',
      fontStyle: 'italic',
      marginTop: -15,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 10,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    },
    fullWidth: {
      flex: 0,
      width: '100%',
    },
    saveButton: {
      backgroundColor: colors.primary,
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    cancelButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
    },
    disabledButton: {
      backgroundColor: colors.border,
      opacity: 0.6,
    },
    // Camera Modal Styles
    cameraContainer: {
      flex: 1,
      backgroundColor: '#000',
    },
    camera: {
      flex: 1,
    },
    cameraControls: {
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 50,
    },
    cameraCloseButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    cameraButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    cameraCaptureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 4,
      borderColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    capturingButton: {
      opacity: 0.7,
    },
    captureButtonInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#fff',
    },
    placeholderButton: {
      width: 60,
      height: 40,
    },
    cameraError: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    cameraErrorText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 30,
    },
  });
export default createStyles;
