import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomePage() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')} // Path to your background image
      style={styles.container} // Apply the styles to ImageBackground
    >
      <Text style={styles.title}>Welcome Jerome ! </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/student_dashboard')}
      >
        <Text style={styles.buttonText}>Go to Your Dashboard</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#fff', // Ensure the text is visible on the background
  },
  button: {
    backgroundColor: '#162938',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
