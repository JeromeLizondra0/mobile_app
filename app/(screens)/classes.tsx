import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Classes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClass, setNewClass] = useState({
    grade: '',
    section: '',
    subject: '',
    teacher: '',
    time: '',
  });
  const [classesData, setClassesData] = useState([
    {
      id: '1',
      grade: 'Grade 8',
      section: 'A',
      subject: 'Math',
      time: '8:00 AM - 9:00 AM',
      teacher: 'Mr. A',
    },
    {
      id: '2',
      grade: 'Grade 9',
      section: 'B',
      subject: 'Science',
      time: '9:00 AM - 10:00 AM',
      teacher: 'Mrs. B',
    },
  ]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClass = () => {
    const { grade, section, subject, teacher, time } = newClass;

    if (!grade || !section || !subject || !teacher || !time) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newEntry = {
        id: (classesData.length + 1).toString(),
        ...newClass,
      };
      setClassesData([...classesData, newEntry]);
      setNewClass({ grade: '', section: '', subject: '', teacher: '', time: '' });
      setIsModalVisible(false);
      setError('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Class</Text>
        </View>
        <Text style={styles.subTitle}>Organize class details</Text>

        <FlatList
          data={classesData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.classCard}>
              {/* Row 1: Grade & Section */}
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>
                    <MaterialIcons name="school" size={16} color="blue" /> Grade:
                  </Text>
                  <Text style={styles.value}>{item.grade}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>
                    <MaterialIcons name="layers" size={16} color="blue" /> Section:
                  </Text>
                  <Text style={styles.value}>{item.section}</Text>
                </View>
              </View>
          
              {/* Row 2: Subject & Time */}
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>
                    <MaterialIcons name="book" size={16} color="blue" /> Subject:
                  </Text>
                  <Text style={styles.value}>{item.subject}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>
                    <MaterialIcons name="schedule" size={16} color="blue" /> Time:
                  </Text>
                  <Text style={styles.value}>{item.time}</Text>
                </View>
              </View>
          
              {/* Row 3: Teacher */}
              <View style={styles.row}>
                <View style={[styles.column, { flex: 1 }]}>
                  <Text style={styles.label}>
                    <MaterialIcons name="person" size={16} color="blue" /> Teacher:
                  </Text>
                  <Text style={styles.value}>{item.teacher}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    paddingBottom: 80,
  },
  titleContainer: {
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111',
  },
  subTitle: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#444',
    textAlign: 'left',
    marginTop: -10,
    paddingBottom: 20,
  },

  classCard: {
    backgroundColor: '#fff',
    padding: 25,
    marginBottom: 20,
    borderRadius: 18,
    elevation: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
  },
});

export default Classes;
