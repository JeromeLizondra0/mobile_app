import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';

const Subjects = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Subjects</Text>
      <Text style={styles.description}>Here are the subjects you are enrolled in</Text>
      <View style={styles.subjectList}>
        <SubjectItem subjectName="English" />
        <SubjectItem subjectName="Math" />
        <SubjectItem subjectName="Filipino" />
        <SubjectItem subjectName="History" />
        <SubjectItem subjectName="T.L.E" />
        <SubjectItem subjectName="Mapeh" />
      </View>
    </View>
  );
};
const SubjectItem = ({ subjectName }: { subjectName: string }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [bgColor, setBgColor] = React.useState('#2980B9');  // Initial blue color

  const handlePress = () => {
    setBgColor('#0056b3');  // Darker blue on press
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setBgColor('#007bff');  // Reset to blue after animation
      Alert.alert('View Details', `You are viewing details for ${subjectName}.`);
    }, 150);
  };

  return (
    <View style={styles.subjectItem}>
      <Text style={styles.subjectText}>{subjectName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to the left
    paddingBottom: 150, // 👈 Add paddingTop instead of marginBottom
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2d2d2d',
    marginBottom: 3,
    textAlign: 'left', // Align the text to the left
    fontFamily: 'Montserrat, sans-serif',
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
    width:'100%',
  },
  description: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 30,
    fontFamily: 'Arial',
    textAlign: 'center',
    maxWidth: '80%',
    fontStyle: 'italic',
  },
  subjectList: {
    width: '100%',
    marginTop: 15,
  },
  subjectItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderLeftWidth: 5,
    borderLeftColor: 'rgba(136, 149, 169, 0.8)',
    width: '100%',
    paddingHorizontal: 25,
  },
  subjectText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Arial',
    maxWidth: '75%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Arial',
  },
  touchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});

export default Subjects;
