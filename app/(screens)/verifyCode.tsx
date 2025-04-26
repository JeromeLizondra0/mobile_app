import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('juan_delacruz'); // sample prefilled username
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss(); // Last box
      }
    } else if (text === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (code[index] === '') {
        if (index > 0) {
          inputs.current[index - 1]?.focus();
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
        }
      }
    }
  };

  const handleSubmitCode = () => {
    const joinedCode = code.join('');
    if (joinedCode.length === 6) {
      router.push('/changePass'); // Navigate to the Reset Password page
      alert(`Code submitted: ${joinedCode}`);
    } else {
      alert('Please enter a valid 6-digit code.');
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.box}>
        <Text style={styles.title}>
          Hello, <Text style={styles.email}>nico.durano@gmail.com</Text>! Please enter the code to verify your account.
        </Text>

        <View style={styles.usernameWrapper}>
          <Text style={styles.usernameLabel}>Username</Text>
          <TextInput
            style={[styles.input, styles.usernameDisplay]}
            value={username}
            editable={false}
          />
        </View>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmitCode}>
          <Text style={styles.buttonText}>Submit Code</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back to Send Email</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#162938',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 28,
  },
  email: {
    fontWeight: 'bold',
    color: '#162938',
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
  input: {
    width: '100%',
    height: 45,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    fontSize: 18,
    textAlign: 'center',
  },
  usernameDisplay: {
    color: '#162938',
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomWidth: 0, // ❌ removed underline
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  codeInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#162938',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#162938',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
