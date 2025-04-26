import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const Parent = ({ route }: any) => {
  const router = useRouter();
  const studentData = route?.params?.studentData || {};

  const [father, setFather] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    contact: '',
    email: '',
    address: '',
  });

  const [mother, setMother] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    contact: '',
    email: '',
    address: '',
  });

  const handleNext = () => {
    router.push({
      pathname: '/guardian',
      params: {
        studentData: JSON.stringify(studentData),
        parentData: JSON.stringify({ father, mother }),
      },
    });
  };

  const handleBack = () => {
    if (studentData.level === 'Elementary') {
      router.push('/Elementary');
    } else if (studentData.level === 'High School') {
      router.push('/Highschool');
    } else {
      router.back(); // fallback
    }  }
  
  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Parent's/Guardian's Information</Text>
        <Text style={styles.subHeader}>
          <Text style={styles.asterisk}>*</Text> Fields marked with asterisks are <Text style={styles.bold}>OPTIONAL</Text>.
        </Text>
        {/* Father's Info */}
        <Text style={styles.sectionTitle}>Father's Information</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput 
              placeholder="First Name" 
              style={styles.input} 
              onChangeText={(text) => setFather({ ...father, firstName: text })} 
            />
          </View>
          <View style={[styles.inputContainer, { marginLeft: 10 }]}>
            <Text style={styles.label}>M.I. <Text style={styles.asterisk}>*</Text></Text>
            <TextInput 
              placeholder="M.I." 
              style={styles.input} 
              onChangeText={(text) => setFather({ ...father, middleName: text })} 
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput 
              placeholder="Last Name" 
              style={styles.input} 
              onChangeText={(text) => setFather({ ...father, lastName: text })} 
            />
          </View>
          <View style={[styles.inputContainer, { marginLeft: 10 }]}>
          <Text style={styles.label}>Suffix <Text style={styles.asterisk}>*</Text></Text>
          <TextInput 
            placeholder="Suffix" 
            style={styles.input} 
            onChangeText={(text) => setFather({ ...father, suffix: text })} 
          />
        </View>
        </View>


        <View style={[styles.inputRow , { marginRight: 15 }]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput 
            placeholder="Contact Number" 
            style={styles.fullInput} 
            keyboardType="phone-pad" 
            onChangeText={(text) => setFather({ ...father, contact: text })} 
          />
        </View>
        <View style={[styles.inputContainer, { marginLeft: 10 }]}>
        <Text style={styles.label}>Email Address</Text>
          <TextInput 
            placeholder="Email Address" 
            style={styles.fullInput} 
            keyboardType="email-address" 
            onChangeText={(text) => setFather({ ...father, email: text })} 
          />
        </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Complete Address</Text>
          <TextInput 
            placeholder="Complete Presents Address" 
            style={styles.fullInput} 
            onChangeText={(text) => setFather({ ...father, address: text })} 
          />
        </View>
        <View style={styles.line}></View>

        {/* Mother's Info */}
        <Text style={styles.sectionTitle}>Mother's Maiden Information</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput 
              placeholder="First Name" 
              style={styles.input} 
              onChangeText={(text) => setMother({ ...mother, firstName: text })} 
            />
          </View>

          <View style={[styles.inputContainer, { marginLeft: 10 }]}>
            <Text style={styles.label}>M.I. <Text style={styles.asterisk}>*</Text></Text>
            <TextInput 
              placeholder="M.I." 
              style={styles.input} 
              onChangeText={(text) => setMother({ ...mother, middleName: text })} 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput 
              placeholder="Last Name" 
              style={styles.input} 
              onChangeText={(text) => setMother({ ...mother, lastName: text })} 
            />
          </View>
        </View>
        <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput 
            placeholder="Contact Number" 
            style={styles.fullInput} 
            keyboardType="phone-pad" 
            onChangeText={(text) => setMother({ ...mother, contact: text })} 
          />
        </View>

        <View style={[styles.inputContainer, { marginLeft: 10 }]}>
        <Text style={styles.label}>Email Address</Text>
          <TextInput 
            placeholder="Email Address" 
            style={styles.fullInput} 
            keyboardType="email-address" 
            onChangeText={(text) => setMother({ ...mother, email: text })} 
          />
        </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Complete Address</Text>
          <TextInput 
            placeholder="Complete Present Address" 
            style={styles.fullInput} 
            onChangeText={(text) => setMother({ ...mother, address: text })} 
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,

  },
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: 'white',
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#374151',
  },
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0, // reduced gap to bring fields closer
    width: 422, // allow full width to better fit on all screens
  },
  inputContainer: {
    flexBasis: '45%',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    paddingVertical: 14, // increased for more height
    paddingHorizontal: 12, // added horizontal padding
    fontSize: 16, // increased for better readability
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 13, // Added bottom margin to create gap between inputs
    maxWidth: 500, // Set max width for the input
    width: '100%',
  },
  fullInput: {
    paddingVertical: 14, // increased for more height
    paddingHorizontal: 12, // added horizontal padding
    fontSize: 16, // increased for better readability
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 13, // Added bottom margin to create gap between inputs
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',  // You can change the color here
    marginVertical: 10,  
    marginTop: 30,       // Add space above and below the line
  },
});
export default Parent;
