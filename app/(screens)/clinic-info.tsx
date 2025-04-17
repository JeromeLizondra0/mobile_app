import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, ImageBackground, 
  TouchableOpacity, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';

const ClinicForm = () => {
  const [allergies, setAllergies] = useState('');
  const [chronicConditions, setChronicConditions] = useState('');
  const [medications, setMedications] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    if (!allergies && !chronicConditions && !medications) {
      alert("Please fill out at least one field.");
      return;
    }

    const clinicFormData = {
      allergies,
      chronicConditions,
      medications,
    };
    
    console.log("Submitted Data:", clinicFormData);
    // Add logic to handle form submission, e.g., send to backend
  };

  const handleBack = () => {
    router.back(); // Adjust the path based on your routing setup
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formBox}>
          <Text style={styles.title}>Clinic Enrollment Form</Text>

          {/* Medical Info Fields */}
          <TextInput
            style={styles.input}
            placeholder="Allergies"
            value={allergies}
            onChangeText={setAllergies}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Chronic Conditions"
            value={chronicConditions}
            onChangeText={setChronicConditions}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Medications"
            value={medications}
            onChangeText={setMedications}
            multiline
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  formBox: { width: '100%', maxWidth: 800, padding: 20, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#162938', padding: 10, marginBottom: 15, minHeight: 60 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' },
  button: { flex: 1, height: 50, backgroundColor: '#162938', justifyContent: 'center', alignItems: 'center', borderRadius: 6, marginHorizontal: 5 },
  buttonText: { color: '#fff', fontWeight: '500' },
});

export default ClinicForm;
