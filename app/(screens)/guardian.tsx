import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const Clinic: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    guardianFirstName: '',
    guardianMiddleName: '',
    guardianLastName: '',
    guardianSuffix: '',
    guardianRelationship: '',
    guardianEmail: '',
    guardianContactNumber1: '',
    guardianContactNumber2: '',
    guardianAddress: '',
    guardianOccupation: '',
    guardianWorkPlaceAddress: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleGuardian = () => {
    router.push('/register');
  };

  const handleBack = () => {
    router.push('/parent'); // Navigate directly to the 'parent' page
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.header}>To Be Filled Out If the Learner Is Not Living with Parents</Text>
         <Text style={styles.subHeader}>
                <Text style={styles.asterisk}>*</Text> Fields marked with asterisks are <Text style={styles.bold}>OPTIONAL</Text>.
              </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name of Legal Guardian</Text>
          <View style={styles.nameFieldContainer}>
            {/* First Row: First Name and Last Name */}
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                value={formData.guardianFirstName}
                onChangeText={(text) => handleInputChange('guardianFirstName', text)}
                placeholder="First Name"
                style={[styles.input, styles.firstNameLastName]}
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                value={formData.guardianLastName}
                onChangeText={(text) => handleInputChange('guardianLastName', text)}
                placeholder="Last Name"
                style={[styles.input, styles.firstNameLastName]}
              />
            </View>
          </View>

          {/* Second Row: Middle Name (M.I.) and Suffix */}
          <View style={styles.nameFieldContainer}>
            <View style={styles.inputField}>
              <Text style={[styles.inputLabel, styles.required]}>M.I. <Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                value={formData.guardianMiddleName}
                onChangeText={(text) => handleInputChange('guardianMiddleName', text)}
                placeholder="M.I."
                style={[styles.input, styles.middleNameSuffix]}
              />
            </View>
            <View style={styles.inputField}>
              <Text style={[styles.inputLabel, styles.required]}>Suffix <Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                value={formData.guardianSuffix}
                onChangeText={(text) => handleInputChange('guardianSuffix', text)}
                placeholder="Suffix"
                style={[styles.input, styles.middleNameSuffix]}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputRow}>
        <View style={[styles.inputContainer, { marginLeft: 2 }]}>
          <Text style={styles.label}>Relationship</Text>
          <TextInput
            value={formData.guardianRelationship}
            onChangeText={(text) => handleInputChange('guardianRelationship', text)}
            placeholder="Relationship to Student"
            style={styles.input}
          />
        </View>

        <View style={[styles.inputContainer, { marginLeft: 10,}]}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={formData.guardianEmail}
            onChangeText={(text) => handleInputChange('guardianEmail', text)}
            placeholder="Email Address"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
        </View>
        <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            value={formData.guardianContactNumber1}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                handleInputChange('guardianContactNumber1', text);
              }
            }}
            placeholder="Contact Number"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={[styles.inputContainer, { marginLeft: 10, height: 58,}]}>
          <Text style={styles.label}>Alternative Contact Number</Text>
          <TextInput
            value={formData.guardianContactNumber2}
            onChangeText={(text) => handleInputChange('guardianContactNumber2', text)}
            placeholder="Alternative Contact No."
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
            </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Complete Home Address</Text>
          <TextInput
            value={formData.guardianAddress}
            onChangeText={(text) => handleInputChange('guardianAddress', text)}
            placeholder="Complete Address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Guardian's Occupation</Text>
          <TextInput
            value={formData.guardianOccupation}
            onChangeText={(text) => handleInputChange('guardianOccupation', text)}
            placeholder="Guardian's Occupation"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Complete Workplace Address</Text>
          <TextInput
            value={formData.guardianWorkPlaceAddress}
            onChangeText={(text) => handleInputChange('guardianWorkPlaceAddress', text)}
            placeholder="Workplace Address"
            style={styles.input}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonNext]} onPress={handleGuardian}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    fontSize: 20,
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
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0, // reduced gap to bring fields closer
    width: 425, // allow full width to better fit on all screens
  },
  inputContainer: {
    marginBottom: 16,
    flexBasis: '45%',

  },
  label: {
    fontSize: 17,
    color: '#555',
    marginBottom: 8,
    fontWeight: 'bold',  // Add this line
  },
  nameFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  firstNameLastName: {
    flex: 0.45, // Adjust to fit both inputs nicely in one row
  },
  middleNameSuffix: {
    flex: 0.45, // Adjust to fit both inputs nicely in one row
  },
  input: {
    paddingVertical: 14, // increased for more height
    paddingHorizontal: 12, // added horizontal padding
    fontSize: 16, // increased for better readability
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 8,

  },
  inputField: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold', // Add this line to make the label bold

  },
  required: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 25,
  },
  buttonNext: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Clinic;
