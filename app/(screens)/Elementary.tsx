import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { registerStudent } from '@/services/auth/authService';


const Elementary: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [contactNumber, setContactNumber] = useState('+63');
  const [email, setEmail] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [lrnNo, setLrnNo] = useState('');


  const [] = useState ('');
  const [address, setAddress] = useState('');

  
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  // ... other states


  // Hardcoded grade levels and suffixes
  const gradeLevels = [
    { id: '1', level_name: 'Grade 1' },
    { id: '2', level_name: 'Grade 2' },
    { id: '3', level_name: 'Grade 3' },
    { id: '4', level_name: 'Grade 4' },
    { id: '5', level_name: 'Grade 5' },
    { id: '6', level_name: 'Grade 6' },
  ];
  const suffixes = [
    { id: '0', suffix_name: 'None' },
    { id: '1', suffix_name: 'Jr.' },
    { id: '2', suffix_name: 'Sr.' },
    { id: '3', suffix_name: 'II' },
    { id: '4', suffix_name: 'III' },
  ];

  const router = useRouter();

  const handleNext = () => {
    const newErrorMessages = {
      firstName: firstName ? '' : 'First Name is required',
      lastName: lastName ? '' : 'Last Name is required',
      gradeLevel: gradeLevel ? '' : 'Grade Level is required',
      birthDate: birthDate ? '' : 'Birth Date is required',
      address: address ? '' : 'Address is required',
    };
    
    const studentData = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      suffix,
      grade_level: gradeLevel,
      date_of_birth: birthDate,
      contact_number: contactNumber,
      email,
      place_of_birth: birthPlace,
      lrn_no: lrnNo,
      address,
    };
  
    router.push({
      pathname: '/parent',
      params: { studentData: JSON.stringify(studentData) },
    });
  };

  const handleRegister = async () => {
    const formData = {
      person: { firstName, lastName, middleName, suffix, birthDate, contactNumber, email, birthPlace, lrnNo },
      student: { gradeLevel },
    };
  
    try {
      // Sending the data to the backend
      const response = await registerStudent(
        formData.person,
        formData.student,
      );
  
      // Handle success response
      if (response.success) {
        alert('Registration successful!');
        console.log('Successfully registered:', response);
        // You can navigate to the next screen or reset the form, depending on your app's flow
      } else {
        // Handle failure
        alert('Registration failed: ' + response.message);
      }
    } catch (error) {
      // Handle any error during registration
      console.error('Registration failed:', error);
      alert('An error occurred during registration. Please try again later.');
    }
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>New/Transferee Student Enrollment</Text>
      <Text style={styles.subHeader}>
        <Text style={styles.asterisk}>*</Text> Fields marked with asterisks are <Text style={styles.bold}>OPTIONAL</Text>.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholder="First Name"
              maxLength={30}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholder="Last Name"
              maxLength={30}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Middle Name <Text style={styles.asterisk}>*</Text></Text>
            <TextInput
              value={middleName}
              onChangeText={setMiddleName}
              style={styles.input}
              placeholder="Middle Name"
              maxLength={30}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Suffix <Text style={styles.asterisk}>*</Text></Text>
            <Picker
              selectedValue={suffix}
              onValueChange={(itemValue) => setSuffix(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="--Select Suffix--" value="" />
              {suffixes.map((suffix) => (
                <Picker.Item key={suffix.id} label={suffix.suffix_name} value={suffix.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Grade Level to Enroll</Text>
            <Picker
              selectedValue={gradeLevel}
              onValueChange={(itemValue) => setGradeLevel(itemValue)}
              style={styles.dropdown}
            >
              <Picker.Item label="--Select Grade Level--" value="" />
              {gradeLevels.map((level) => (
                <Picker.Item key={level.id} label={level.level_name} value={level.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>LRN Number</Text>
            <TextInput
              value={lrnNo}
              onChangeText={setLrnNo}
              style={styles.input}
              placeholder="LRN Number"
              maxLength={25}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              value={contactNumber}
              onChangeText={setContactNumber}
              style={styles.input}
              placeholder="+63XXXXXXXXXX"
              maxLength={13}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birth Place</Text>
            <TextInput
              value={birthPlace}
              onChangeText={setBirthPlace}
              style={styles.input}
              placeholder="Place of Birth"
              maxLength={50}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birthdate</Text>
            <TextInput
              value={birthDate}
              onChangeText={setBirthDate}
              style={styles.input}
              placeholder="Birthdate"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Complete Home Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholder="Complete Present Address"
            maxLength={50}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Take up the full height of the screen
    padding: 20,
    backgroundColor: '#f9f9f9',
    minHeight: '100%',  // Ensure the container takes the full height even on small screens
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  asterisk: {
    color: 'red',
  },
  bold: {
    fontWeight: 'bold',
  },
  section: {
    flex: 1,  // Ensure it fills the available space
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    paddingVertical: 14, // increased for more height
    paddingHorizontal: 12, // added horizontal padding
    fontSize: 16, // increased for better readability
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  dropdown: {
    height: 47,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#007BFF', // change to your desired outline color
    backgroundColor: '#fff',
    fontSize: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  
    // simulate outline using shadow (optional)
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2, // for Android
  },
  
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 80,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Elementary;
