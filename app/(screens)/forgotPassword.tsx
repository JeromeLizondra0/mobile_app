import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/verifyCode');
    }, 3000);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.box}>
        <Image source={require('@/assets/images/SCLC.png')} style={styles.logo} />
        <Text style={styles.title}>Please Verify your account!</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholderTextColor="#444"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.verifyText}>Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.verifyButton, styles.loginButton]} onPress={() => router.push('/login')}>
          <Text style={styles.verifyText}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 80,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#162938',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    color: '#162938',
    marginBottom: 5,
    fontWeight: '600',
    marginLeft: 12,
  },
  input: {
    width: '100%',
    height: 45,
    fontSize: 16,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#162938',
    borderWidth: 2,
  },
  verifyButton: {
    marginTop: 16,
    backgroundColor: '#162938',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: '#555',
  },
  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
