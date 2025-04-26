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

const ReturneeHighSchool: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [contactNumber, setContactNumber] = useState('+63');
  const [email, setEmail] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [lrnNo, setLrnNo] = useState('');
  const [address, setAddress] = useState('');

  // Hardcoded grade levels and suffixes
  const gradeLevels = [
    { id: '7', level_name: 'Grade 7' },
    { id: '8', level_name: 'Grade 8' },
    { id: '9', level_name: 'Grade 9' },
    { id: '10', level_name: 'Grade 10' },
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
    const studentData = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      suffix,
      grade_level: gradeLevel,
      specialization, // Include the specialization in the data
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
              onValueChange={(itemValue) => {
                setGradeLevel(itemValue);
                // Reset specialization when grade level changes
                setSpecialization('');
              }}
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

        {/* Conditional specialization options */}
        {(gradeLevel === '9' || gradeLevel === '10') && (
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Specialization</Text>
              <Picker
                selectedValue={specialization}
                onValueChange={(itemValue) => setSpecialization(itemValue)}
                style={styles.dropdown}
              >
                <Picker.Item label="--Select Specialization--" value="" />
                <Picker.Item label="ICT (Computer Specialization)" value="ICT" />
                <Picker.Item label="Cookery (TLE Specialization)" value="Cookery" />
              </Picker>
            </View>
          </View>
        )}
        {/* Remaining input fields */}
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReturneeHighSchool;
