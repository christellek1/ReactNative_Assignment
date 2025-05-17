import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('Christelle Doe');
  const [email, setEmail] = useState('christelle@example.com');
  const [password, setPassword] = useState('');
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showPersonalInfo && styles.activeButton,
          ]}
          onPress={() => setShowPersonalInfo(true)}
        >
          <Text
            style={[
              styles.buttonText,
              showPersonalInfo && styles.activeButtonText,
            ]}
          >
            Personal Information
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            !showPersonalInfo && styles.activeButton,
          ]}
          onPress={() => setShowPersonalInfo(false)}
        >
          <Text
            style={[
              styles.buttonText,
              !showPersonalInfo && styles.activeButtonText,
            ]}
          >
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
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter new password"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#fff',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
});

export default ProfileScreen;
