import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

// Floating Label Input Component
const FloatingLabelInput = ({ label, value, onChangeText }) => {
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
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelPosition.interpolate({ inputRange: [0, 1], outputRange: [17, 0] }),
            fontSize: labelPosition.interpolate({ inputRange: [0, 1], outputRange: [14, 15] }),
            color: labelPosition.interpolate({ inputRange: [0, 1], outputRange: ['#aaa', '#162938'] }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const Highschool = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthPlace, setBirthPlace] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [customReligion, setCustomReligion] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const router = useRouter();

  const handleDateChange = (event: any, selectedDate: React.SetStateAction<Date>) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const handleProceed = () => {
    router.push('/parent');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formBox}>
          <Text style={styles.title}>Student Information</Text>

          <View style={styles.row}>
            <FloatingLabelInput label="First Name" value={firstName} onChangeText={setFirstName} />
            <FloatingLabelInput label="Last Name" value={lastName} onChangeText={setLastName} />
          </View>

          <View style={styles.row}>
            <FloatingLabelInput label="Middle Name" value={middleName} onChangeText={setMiddleName} />
            <FloatingLabelInput label="Suffix (e.g., Jr., Sr.)" value={suffix} onChangeText={setSuffix} />
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>{birthDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker value={birthDate} mode="date" display="default" onChange={handleDateChange} />
            )}
            <FloatingLabelInput label="Birth Place" value={birthPlace} onChangeText={setBirthPlace} />
          </View>

          <View style={styles.row}>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={gradeLevel} onValueChange={(itemValue) => setGradeLevel(itemValue)} style={styles.fullWidthPicker}>
                <Picker.Item label="Select Grade Level" value="" />
                <Picker.Item label="Kindergarten" value="Kindergarten" />
                <Picker.Item label="Grade 1" value="Grade 1" />
                <Picker.Item label="Grade 2" value="Grade 2" />
                <Picker.Item label="Grade 3" value="Grade 3" />
                <Picker.Item label="Grade 4" value="Grade 4" />
                <Picker.Item label="Grade 5" value="Grade 5" />
                <Picker.Item label="Grade 6" value="Grade 6" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} mode="dropdown" style={styles.fullWidthPicker}>
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Picker selectedValue={religion} onValueChange={(itemValue) => setReligion(itemValue)} mode="dropdown" style={styles.fullWidthPicker}>
              <Picker.Item label="Select Religion" value="" />
              <Picker.Item label="Christianity" value="Christianity" />
              <Picker.Item label="Islam" value="Islam" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>

          {gender === 'Others' && (
            <FloatingLabelInput label="Enter Gender" value={customGender} onChangeText={setCustomGender} />
          )}

          {religion === 'Others' && (
            <FloatingLabelInput label="Enter Religion" value={customReligion} onChangeText={setCustomReligion} />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleProceed}>
              <Text style={styles.buttonText}>Proceed</Text>
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  inputContainer: { position: 'relative', width: '48%' },
  label: { position: 'fixed', left: 10, color: '#666', paddingHorizontal: 5 },
  input: { height: 40, borderBottomWidth: 1, borderBottomColor: '#162938', paddingHorizontal: 10 },
  pickerContainer: { width: '48%', borderBottomWidth: 1, borderBottomColor: '#162938' },
  fullWidthPicker: { width: '100%' },
  dateInput: { width: '48%', justifyContent: 'center', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#162938' },
  dateText: { color: '#162938', fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' },
  button: { flex: 1, height: 50, backgroundColor: '#162938', justifyContent: 'center', alignItems: 'center', borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '500' },
});

export default Highschool;
