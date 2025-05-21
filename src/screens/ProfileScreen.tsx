import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/molecules/Navbar';
import { useAuthStore } from '../store/authStore';

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { theme, colors } = useTheme();
  const styles = createStyles(colors, theme);

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [activeTab, setActiveTab] = useState('ProfileScreen');

  const logout = useAuthStore((state) => state.logout);

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
              routes: [{ name: 'Auth' }],  // Navigate to login screen
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

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
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={"white"}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={"white"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter current password"
              placeholderTextColor={"white"}
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter new password"
              placeholderTextColor={"white"}
            />

            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Confirm new password"
              placeholderTextColor={"white"}
            />
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
  });

export default ProfileScreen;
