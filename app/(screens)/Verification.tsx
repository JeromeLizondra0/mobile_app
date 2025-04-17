import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router'; // <-- Import useRouter


export default function VerificationScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const router = useRouter(); // <-- Initialize router

  const handleVerify = () => {
    router.push('/login'); // <-- Navigate to login
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
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholderTextColor="#444"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        <View style={styles.optionsRow}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.helpText}>Help?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyText}>Verify</Text>
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
    position: 'relative',
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
    width: '100%',
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
    marginLeft: 12, // same effect, just with margin
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
    height: 15,
    width: 15,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  helpText: {
    fontSize: 14,
    color: '#162938',
    textDecorationLine: 'underline',
  },
  verifyButton: {
    marginTop: 16,
    backgroundColor: '#162938',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
