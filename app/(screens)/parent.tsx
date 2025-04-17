import React, { useState, useEffect } from 'react';
import { 
  View, TextInput, Text, TouchableOpacity, ScrollView, 
  ImageBackground, Animated, StyleSheet 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

// Floating Label Input Component
const FloatingLabelInput = ({ label, value, onChangeText, keyboardType = 'default', style = {} }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  return (
    <View style={[styles.inputContainer, style]}>
      <Animated.Text
        style={[ 
          styles.label, 
          {
            top: labelPosition.interpolate({ inputRange: [0, 1], outputRange: [30, 10] }),
            fontSize: labelPosition.interpolate({ inputRange: [0, 1], outputRange: [16, 16] }),
            color: labelPosition.interpolate({ inputRange: [0, 1], outputRange: ['#666', '#162938'] }),
          }
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const ParentsInfoForm = () => {
  const [relationship, setRelationship] = useState('');
  const [customRelation, setCustomRelation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [education, setEducation] = useState('');
  const [customEducation, setCustomEducation] = useState('');
  const [state, setState] = useState('');
  const [customState, setCustomState] = useState('');
  const [city, setCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [customPostalCode, setCustomPostalCode] = useState('');
  const router = useRouter();

  // Phone number formatting function
  const formatContactNumber = (number) => {
    let formatted = number.replace(/\D/g, ''); // Remove all non-digit characters
    if (formatted.startsWith('0')) {
      formatted = formatted.slice(1); // Remove leading zero
    }
    if (formatted.length > 0 && formatted[0] !== '9') {
      return `+63 ${formatted}`;
    }
    return `+63 ${formatted}`;
  };

  const handleContactNumberChange = (text) => {
    setContactNumber(formatContactNumber(text));
  };

  return (
    <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formBox}>
          <Text style={styles.title}>Parents/Guardians Information</Text>

          {/* Relationship and Contact Number Side by Side */}
            <View style={styles.row}>
            <View style={styles.pickerContainer}>
              {relationship !== 'Other' ? (
                <Picker selectedValue={relationship} onValueChange={(val) => setRelationship(val)} style={styles.picker}>
                  <Picker.Item label="Select Relationship" value="" />
                  <Picker.Item label="Father" value="Father" />
                  <Picker.Item label="Mother" value="Mother" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              ) : (
                <FloatingLabelInput label="Enter Relationship" value={customRelation} onChangeText={setCustomRelation} style={{ width: '100%' }} />
              )}
            </View>
            <View style={styles.inputContainer}>
              <FloatingLabelInput 
                label="Contact Number" 
                value={contactNumber} 
                onChangeText={handleContactNumberChange} 
                keyboardType="phone-pad"
                style={{ width: '100%', top: 10}}
              />
            </View>
          </View>

          {/* Full Name Inputs */}
          <View style={styles.row}>
            <FloatingLabelInput label="Last Name" value={lastName} onChangeText={setLastName} />
            <FloatingLabelInput label="First Name" value={firstName} onChangeText={setFirstName} />
          </View>
          <View style={styles.row}>
            <FloatingLabelInput label="Middle Name" value={middleName} onChangeText={setMiddleName} />
            <FloatingLabelInput label="Suffix" value={suffix} onChangeText={setSuffix} />
          </View>

          {/* Education Attainment */}




          <View style={styles.row}>
            <View style={styles.pickerContainer}>
                {education !== 'Other' ? (
                  <Picker
                    selectedValue={education}
                    onValueChange={(val) => setEducation(val)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Education" value="" />
                    <Picker.Item label="High School Graduate" value="High School Graduate" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                ) : (
                  <FloatingLabelInput
                    label="Enter Education"
                    value={customEducation}
                    onChangeText={setCustomEducation}
                    style={{ width: '100%' }} // Ensure the input takes up the full width
                  />
                )}
              </View>
              <View style={styles.pickerContainer}>
              {postalCode !== 'Other' ? (
                <Picker
                    selectedValue={education}
                    onValueChange={(val) => setPostalCode(val)}
                    style={styles.picker}
                  >
                  <Picker.Item label="Select Postal Code" value="" />
                  <Picker.Item label="6015 - Lapu-Lapu" value="6015" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              ) : (
                <View style={{ width: '100%'}}>
                  <FloatingLabelInput
                    label="Enter Postal Code"
                    value={customPostalCode}
                    onChangeText={setCustomPostalCode}
                    style={{ width: '100%' }}   // Ensure consistent underline
                  />
                </View>
              )}
            </View>
          </View>

          {/* State/Province */}
          <View style={styles.row}>
  {/* State/Province Picker */}
  <View style={styles.pickerContainer}>
    {state !== 'Other' ? (
      <Picker selectedValue={state} onValueChange={(val) => setState(val)} style={styles.picker}>
        <Picker.Item label="Select State/Province" value="" />
        <Picker.Item label="Metro Manila" value="Metro Manila" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
    ) : (
      <View style={{ width: '100%' }}>
        <FloatingLabelInput
          label="Enter State/Province"
          value={customState}
          onChangeText={setCustomState}
          style={{ width: '100%' }} // Ensure consistent styling with picker
        />
      </View>
    )}
  </View>

  {/* City Picker */}
  <View style={styles.pickerContainer}>
    {city !== 'Other' ? (
      <Picker selectedValue={city} onValueChange={(val) => setCity(val)} style={styles.picker}>
        <Picker.Item label="Select City" value="" />
        <Picker.Item label="Quezon City" value="Quezon City" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
    ) : (
      <View style={{ width: '100%' }}>
        <FloatingLabelInput
          label="Enter City"
          value={customCity}
          onChangeText={setCustomCity}
          style={{ width: '100%' }} // Ensure consistent styling with picker
        />
      </View>
    )}
  </View>
</View>


          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/clinic-info')}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// In the inputContainer and pickerContainer, make sure to use flex values to match width.
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formBox: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    position: 'relative',
    width: '48%',  // Ensure consistency in width
  },
  label: {
    position: 'fixed',
    left: 10,
    color: '#666',
    paddingHorizontal: 5,
    width: '100%',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#162938',
    paddingHorizontal: 10,
    width: '99%', // Ensure the input takes up the full width
  },
  pickerContainer: {
    width: '48%', // Ensure input takes up full width
    borderBottomWidth: 1,
    borderBottomColor: '#162938',
    paddingTop: 10,
    position: 'relative',
  },
  picker: {
  width: '100%',
  height: 40, // Match height of FloatingLabelInput
  borderBottomWidth: 1,
  borderBottomColor: '#162938',
  paddingHorizontal: 10,
  paddingBottom: 50
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#162938',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
});


export default ParentsInfoForm;
