import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/molecules/Navbar';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../api/axiosInstance';

// Try to import camera, but handle if it's not available
let Camera, useCameraDevices, useCameraPermission;
let cameraAvailable = false;

try {
  const cameraModule = require('react-native-vision-camera');
  Camera = cameraModule.Camera;
  useCameraDevices = cameraModule.useCameraDevices;
  useCameraPermission = cameraModule.useCameraPermission;
  cameraAvailable = true;
} catch (error) {
  console.log('React Native Vision Camera not available, using fallback');
  cameraAvailable = false;
}

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { theme, colors } = useTheme();
  const styles = createStyles(colors, theme);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [activeTab, setActiveTab] = useState('ProfileScreen');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [originalData, setOriginalData] = useState({ firstName: '', lastName: '', email: '' });

  // Camera related states
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);

  // Camera setup - only if camera is available
  const camera = useRef<any>(null);
  let devices, device, hasPermission, requestPermission;

  if (cameraAvailable && useCameraDevices && useCameraPermission) {
    try {
      devices = useCameraDevices();
      device = devices?.front || devices?.back;
      const permissionHook = useCameraPermission();
      hasPermission = permissionHook.hasPermission;
      requestPermission = permissionHook.requestPermission;
    } catch (error) {
      console.log('Error setting up camera hooks:', error);
    }
  }

  // Request camera permission
  const requestCameraPermission = async () => {
    if (!cameraAvailable || !requestPermission) {
      Alert.alert(
        'Camera Not Available',
        'Camera functionality is not available. Please check your installation.',
        [{ text: 'OK' }]
      );
      return false;
    }

    try {
      const permission = await requestPermission();
      if (!permission) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take profile photos.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert(
        'Error',
        'Failed to request camera permission.',
        [{ text: 'OK' }]
      );
      return false;
    }
  };

  // Open camera modal
  const openCamera = async () => {
    if (!cameraAvailable) {
      Alert.alert(
        'Camera Not Available',
        'React Native Vision Camera is not properly installed. Please install it first:\n\nnpm install react-native-vision-camera\n\nThen follow the platform-specific setup instructions.',
        [{ text: 'OK' }]
      );
      return;
    }

    const hasPermission = await requestCameraPermission();
    if (hasPermission && device) {
      setIsCameraVisible(true);
    } else if (!device) {
      Alert.alert('Error', 'No camera device available');
    }
  };

  // Capture photo
  const capturePhoto = async () => {
    if (!camera.current || !cameraAvailable) return;

    try {
      setIsCapturing(true);
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: 'off',
        enableAutoRedEyeReduction: true,
      });

      const imageUri = `file://${photo.path}`;
      setCapturedImage(imageUri);
      setIsCameraVisible(false);
      
      // Upload the image
      await uploadProfileImage(imageUri);
    } catch (error) {
      console.error('Error capturing photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  // Upload profile image
  const uploadProfileImage = async (imageUri: string) => {
    if (!accessToken) {
      Alert.alert('Authentication Error', 'Please log in again');
      return;
    }

    try {
      setIsSaving(true);
      
      const formData = new FormData();
      formData.append('profileImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any);

      const response = await axiosInstance.put('/api/user/profile-image', formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProfileImage(imageUri);
        Alert.alert('Success', 'Profile image updated successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired', 
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: () => {
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              }
            }
          ]
        );
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to update profile image';
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Close camera modal
  const closeCameraModal = () => {
    setIsCameraVisible(false);
    setCapturedImage(null);
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!accessToken) {
      console.log('No access token available');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Fetching user profile...');
      
      const response = await axiosInstance.get('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      console.log('Profile response:', response.data);
      
      if (response.data.success && response.data.data?.user) {
        const userData = response.data.data.user;
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setProfileImage(userData.profileImage?.url || '');
        setOriginalData({ 
          firstName: userData.firstName || '', 
          lastName: userData.lastName || '',
          email: userData.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired', 
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: () => {
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              }
            }
          ]
        );
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to load profile data';
        console.log('Profile fetch error:', errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async () => {
    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First name is required');
      return;
    }

    if (!lastName.trim()) {
      Alert.alert('Validation Error', 'Last name is required');
      return;
    }

    if (!accessToken) {
      Alert.alert('Authentication Error', 'Please log in again');
      return;
    }

    try {
      setIsSaving(true);
      console.log('Updating profile:', { 
        firstName: firstName.trim(), 
        lastName: lastName.trim() 
      });
      
      // Create FormData for the request
      const formData = new FormData();
      formData.append('firstName', firstName.trim());
      formData.append('lastName', lastName.trim());

      const response = await axiosInstance.put('/api/user/profile', formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile update response:', response.data);
      
      if (response.data.success && response.data.data?.user) {
        const updatedUser = response.data.data.user;
        setOriginalData({ 
          firstName: updatedUser.firstName || firstName.trim(), 
          lastName: updatedUser.lastName || lastName.trim(),
          email: updatedUser.email || email
        });
        
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired', 
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: () => {
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              }
            }
          ]
        );
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to update profile';
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Change password (assuming this endpoint exists)
  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Validation Error', 'All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Validation Error', 'New password must be at least 6 characters long');
      return;
    }

    if (!accessToken) {
      Alert.alert('Authentication Error', 'Please log in again');
      return;
    }

    try {
      setIsSaving(true);
      console.log('Changing password...');
      
      await axiosInstance.put('/api/user/change-password', {
        currentPassword,
        newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      Alert.alert('Success', 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired', 
          'Your session has expired. Please log in again.',
          [
            {
              text: 'OK',
              onPress: () => {
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              }
            }
          ]
        );
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to change password';
        Alert.alert('Error', errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Check if profile data has changed
  const hasProfileChanged = () => {
    return firstName.trim() !== originalData.firstName || 
           lastName.trim() !== originalData.lastName;
  };

  // Reset form to original values
  const resetForm = () => {
    setFirstName(originalData.firstName);
    setLastName(originalData.lastName);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [accessToken]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
        <Navbar
          activeTab={activeTab}
          navigation={navigation}
          colors={colors}
          theme={theme}
          setActiveTab={setActiveTab}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with logout button */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile Settings</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, showPersonalInfo && styles.activeButton]}
            onPress={() => setShowPersonalInfo(true)}
          >
            <Text style={[styles.buttonText, showPersonalInfo && styles.activeButtonText]}>
              Personal Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, !showPersonalInfo && styles.activeButton]}
            onPress={() => setShowPersonalInfo(false)}
          >
            <Text style={[styles.buttonText, !showPersonalInfo && styles.activeButtonText]}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>

        {showPersonalInfo ? (
          <View style={styles.form}>
            {/* Profile Image Section */}
            <View style={styles.profileImageSection}>
              <Text style={styles.label}>Profile Picture</Text>
              <View style={styles.profileImageContainer}>
                {profileImage || capturedImage ? (
                  <Image 
                    source={{ uri: capturedImage || profileImage }} 
                    style={styles.profileImage} 
                  />
                ) : (
                  <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileImagePlaceholderText}>
                      {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.changeImageButton}
                  onPress={openCamera}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <ActivityIndicator size="small" color={colors.text} />
                  ) : (
                    <Text style={styles.changeImageButtonText}>
                      {cameraAvailable ? 'Take Photo' : 'Camera Not Available'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              placeholderTextColor="rgba(255,255,255,0.6)"
              editable={!isSaving}
            />

            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              placeholderTextColor="rgba(255,255,255,0.6)"
              editable={!isSaving}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={email}
              placeholder="Email address"
              placeholderTextColor="rgba(255,255,255,0.6)"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
            />
            <Text style={styles.helperText}>Email cannot be changed</Text>

            <View style={styles.actionButtons}>
              {hasProfileChanged() && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={resetForm}
                  disabled={isSaving}
                >
                  <Text style={styles.cancelButtonText}>Reset</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.actionButton, 
                  styles.saveButton,
                  !hasProfileChanged() && styles.disabledButton
                ]}
                onPress={updateUserProfile}
                disabled={isSaving || !hasProfileChanged()}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Current Password *</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="Enter current password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              editable={!isSaving}
            />

            <Text style={styles.label}>New Password *</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password (min. 6 characters)"
              placeholderTextColor="rgba(255,255,255,0.6)"
              editable={!isSaving}
            />

            <Text style={styles.label}>Confirm New Password *</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm new password"
              placeholderTextColor="rgba(255,255,255,0.6)"
              editable={!isSaving}
            />

            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.saveButton, 
                styles.fullWidth,
                (!currentPassword || !newPassword || !confirmPassword) && styles.disabledButton
              ]}
              onPress={changePassword}
              disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Change Password</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Camera Modal - Only render if camera is available */}
      {cameraAvailable && Camera && (
        <Modal
          visible={isCameraVisible}
          animationType="slide"
          statusBarTranslucent
          onRequestClose={closeCameraModal}
        >
          <View style={styles.cameraContainer}>
            {device && hasPermission ? (
              <>
                <Camera
                  ref={camera}
                  style={styles.camera}
                  device={device}
                  isActive={isCameraVisible}
                  photo={true}
                />
                
                <View style={styles.cameraControls}>
                  <TouchableOpacity
                    style={styles.cameraCloseButton}
                    onPress={closeCameraModal}
                  >
                    <Text style={styles.cameraButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.cameraCaptureButton, isCapturing && styles.capturingButton]}
                    onPress={capturePhoto}
                    disabled={isCapturing}
                  >
                    {isCapturing ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <View style={styles.captureButtonInner} />
                    )}
                  </TouchableOpacity>
                  
                  <View style={styles.placeholderButton} />
                </View>
              </>
            ) : (
              <View style={styles.cameraError}>
                <Text style={styles.cameraErrorText}>
                  {!device ? 'No camera device available' : 'Camera permission required'}
                </Text>
                <TouchableOpacity
                  style={styles.cameraCloseButton}
                  onPress={closeCameraModal}
                >
                  <Text style={styles.cameraButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      )}

      <Navbar
        activeTab={activeTab}
        navigation={navigation}
        colors={colors}
        theme={theme}
        setActiveTab={setActiveTab}
      />
    </SafeAreaView>
  );
};

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

export default ProfileScreen;