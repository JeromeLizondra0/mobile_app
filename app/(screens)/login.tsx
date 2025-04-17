import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { login } from '@/services/auth/authService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const isLoginEnabled = username.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    if (!isLoginEnabled) return;
    try {
      const result = await login(username, password);
      if (result.redirectUrl == '/student/dashboard') {
        router.push('/Home');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    }
  };

  const handleOnlineRegistration = () => {
    router.push('/choices');
  };

  return (
    <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={rememberMe}
                onValueChange={setRememberMe}
              />
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, !isLoginEnabled && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!isLoginEnabled}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleOnlineRegistration}
          >
            <Text style={styles.registerButtonText}>Online Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#162938',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#162938',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 45,
    fontSize: 16,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#333',
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputPassword: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#162938',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#162938',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#162938',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginPage;
