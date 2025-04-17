import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from 'expo-router';  // Importing useRouter

// Defining color and design constants
const colors = {
  primary: "#06a8f3",
  danger: "#ff7782",
  success: "#41f1b6",
  warning: "#ffbb55",
  white: "#fff",
  info: "#7d8da1",
  dark: "#363949",
  light: "rgba(132, 139, 200, 0.18)",
  darkVariant: "#677483",
  background: "#f6f6f9",
};

const Choices = () => {
  const [showNewReturneeOptions, setShowNewReturneeOptions] = useState(false);
  const [showTransfereeOptions, setShowTransfereeOptions] = useState(false);
  const [showOldOptions, setShowOldOptions] = useState(false);

  const router = useRouter();  // Initialize useRouter

  const handleNewReturneePress = () => {
    setShowNewReturneeOptions(!showNewReturneeOptions);
  };

  const handleTransfereePress = () => {
    setShowTransfereeOptions(!showTransfereeOptions);
  };

  const handleOldPress = () => {
    setShowOldOptions(!showOldOptions);
  };

  // Function to navigate based on selected option
  const handleOptionSelect = (level: string) => {
    if (level === "Elementary") {
      router.push("/Elementary"); // Navigate to Elementary.tsx for New/Returnee and Transferee
    } else if (level === "High School") {
      router.push("/Highschool"); // Navigate to Highschool.tsx for New/Returnee and Transferee
    }
  };

  // Custom handler for Old option (navigate to Verification.tsx)
  const handleOldOptionSelect = (level: string) => {
    if (level === "Elementary") {
      router.push("/Verification"); // Navigate to Verification.tsx for Old students
    } else if (level === "High School") {
      router.push("/Verification"); // Navigate to Highschool.tsx for Old students
    }
  };

  return (
    <ImageBackground 
      source={require("@/assets/images/background.jpg")} 
      style={styles.container} 
      resizeMode="cover"
    >
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Image source={require("@/assets/images/SCLC.png")} style={styles.logo} />
          <Text style={styles.selectLocationText}>Please select where you'd like to enroll</Text>

          {/* New/Returnee Button */}
          <TouchableOpacity style={styles.button} onPress={handleNewReturneePress}>
            <Text style={styles.boxText}>New/Returnee</Text>
          </TouchableOpacity>

          {/* Options for New/Returnee */}
          {showNewReturneeOptions && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionSelect('Elementary')}>
                <Text style={styles.optionText}>Elementary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionSelect('High School')}>
                <Text style={styles.optionText}>High School</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Transferee Button */}
          <TouchableOpacity style={styles.button} onPress={handleTransfereePress}>
            <Text style={styles.boxText}>Transferee</Text>
          </TouchableOpacity>

          {/* Options for Transferee */}
          {showTransfereeOptions && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionSelect('Elementary')}>
                <Text style={styles.optionText}>Elementary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionSelect('High School')}>
                <Text style={styles.optionText}>High School</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Old Button */}
          <TouchableOpacity style={styles.button} onPress={handleOldPress}>
            <Text style={styles.boxText}>Old</Text>
          </TouchableOpacity>

          {/* Options for Old Students */}
          {showOldOptions && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleOldOptionSelect('Elementary')}>
                <Text style={styles.optionText}>Elementary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => handleOldOptionSelect('High School')}>
                <Text style={styles.optionText}>High School</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, 
    alignItems: 'center',
    width: '100%',
    maxWidth: 350, 
    overflow: 'hidden',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  selectLocationText: {
    fontSize: 16,
    color: colors.darkVariant,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#162938',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    elevation: 5,
  },
  boxText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#162938',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});

export default Choices;
