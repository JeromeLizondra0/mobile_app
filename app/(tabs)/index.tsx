import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {

  // Navigate to login when 'Proceed' button is clicked
  const handleProceed = () => {
    router.push('/login'); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/background.jpg')}  // Background image
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to Sta.Cruz Portal</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
    resizeMode: 'cover',  // Ensure the image covers the entire screen
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay for better text visibility
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
