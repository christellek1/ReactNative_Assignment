import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/molecules/Navbar';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../api/axiosInstance'; 

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

  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);

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
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileImagePlaceholderText}>
                      {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
                <TouchableOpacity style={styles.changeImageButton}>
                  <Text style={styles.changeImageButtonText}>Change Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              placeholderTextColor={ "rgba(255,255,255,0.6)"}
              editable={!isSaving}
            />

            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              placeholderTextColor={"rgba(255,255,255,0.6)"}
              editable={!isSaving}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={email}
              placeholder="Email address"
              placeholderTextColor={"rgba(255,255,255,0.6)"}
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
              placeholderTextColor={ "rgba(255,255,255,0.6)"}
              editable={!isSaving}
            />

            <Text style={styles.label}>New Password *</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password (min. 6 characters)"
              placeholderTextColor={ "rgba(255,255,255,0.6)"}
              editable={!isSaving}
            />

            <Text style={styles.label}>Confirm New Password *</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm new password"
              placeholderTextColor={ "rgba(255,255,255,0.6)"}
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
  });

export default ProfileScreen;