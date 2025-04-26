import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChangePassScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('juan_delacruz'); // sample username
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Password successfully changed!');
    router.push('/login'); // Redirect to login page after success
  };

  const handleBackToLogin = () => {
    router.push('/login'); // Redirect to login page
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/background.jpg')} // Set background image
      style={styles.background} 
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <View style={styles.formWrapper}>
          {/* Username input with placeholder */}
          <View style={styles.usernameWrapper}>
                    <Text style={styles.usernameLabel}>Username</Text>
                    <TextInput
                      style={[styles.input, styles.usernameDisplay]}
                      value={username}
                      editable={false}
                    />
                  </View>

          {/* New Password input */}
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
          />

          {/* Confirm Password input */}
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>

        {/* Update Password Button */}
<TouchableOpacity style={styles.button} onPress={handleChangePassword}>
  <Text style={styles.buttonText}>Update Password</Text>
</TouchableOpacity>

{/* Back to Login Button */}
<TouchableOpacity
  style={styles.backButton}
  onPress={handleBackToLogin}
>
  <Text style={styles.backButtonText}>Back to Login</Text>
</TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Center content
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with transparency
    padding: 20,
    borderRadius: 8, // Make the container slightly rounded
    width: '90%',
    maxWidth: 400, // Limit the width of the form box
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#162938',
    marginBottom: 30,
    textAlign: 'center', // Align the title to the left
    width: '100%',
  },
  formWrapper: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 45,
    fontSize: 18,
    textAlign: 'left', // Align text to the left in the input fields
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderBottomColor: '#162938',
    borderBottomWidth: 1,
    color: '#162938', // Dark text color
  },
  usernameInput: {
    fontSize: 30,
    color: '#162938',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordInput: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#162938',
    paddingVertical: 16, // Increased vertical padding
    paddingHorizontal: 30, // Increased horizontal padding
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,   
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  backButton: {
    backgroundColor: '#162938',
    paddingVertical: 16, // Increased vertical padding
    paddingHorizontal: 30, // Increased horizontal padding
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  usernameWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  usernameLabel: {
    fontSize: 16,
    color: '#162938',
    marginBottom: 5,
    fontWeight: '600',
    textAlign: 'left',
  },
  usernameDisplay: {
    color: '#162938',
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 0, // ❌ removed underline
    fontWeight: 'bold',

  },
});
