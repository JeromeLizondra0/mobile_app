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
import { useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Classes = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClass, setNewClass] = useState({ grade: '', section: '', subject: '', teacher: '' });
  const [classesData, setClassesData] = useState([
    { id: '1', grade: 'Grade 8', section: 'A', subject: 'Math', teacher: 'Mr. A' },
    { id: '2', grade: 'Grade 9', section: 'B', subject: 'Science', teacher: 'Mrs. B' },
  ]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const addClass = useCallback(() => {
    const errors = {};
    if (!newClass.grade) errors.grade = 'Grade is required';
    if (!newClass.section) errors.section = 'Section is required';
    if (!newClass.subject) errors.subject = 'Subject is required';
    if (!newClass.teacher) errors.teacher = 'Teacher is required';

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (isEditMode) {
        setClassesData((prevData) =>
          prevData.map((item) =>
            item.id === editId ? { ...newClass, id: editId } : item
          )
        );
      } else {
        const newClassWithId = { ...newClass, id: (classesData.length + 1).toString() };
        setClassesData((prevData) => [...prevData, newClassWithId]);
      }

      setNewClass({ grade: '', section: '', subject: '', teacher: '' });
      setIsModalVisible(false);
      setError({});
      setIsLoading(false);
      setIsEditMode(false);
      setEditId('');
    }, 1000);
  }, [newClass, classesData, isEditMode, editId]);

  const deleteClass = (id) => {
    setClassesData(classesData.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Classes</Text>
      </View>
      <Text style={styles.subTitle}>Manage and organize class details</Text>

      <FlatList
        data={classesData}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        renderItem={({ item }) => (
          <View style={styles.classCard}>
            <View style={styles.classInfo}>
              <MaterialIcons name="school" size={24} color="blue" />
              <Text style={styles.classText}>Grade: {item.grade}</Text>
            </View>
            <View style={styles.classInfo}>
              <MaterialIcons name="group" size={24} color="blue" />
              <Text style={styles.classText}>Section: {item.section}</Text>
            </View>
            <View style={styles.classInfo}>
              <MaterialIcons name="book" size={24} color="blue" />
              <Text style={styles.classText}>Subject: {item.subject}</Text>
            </View>
            <View style={styles.classInfo}>
              <MaterialIcons name="person" size={24} color="blue" />
              <Text style={styles.classText}>Teacher: {item.teacher}</Text>
            </View>

            <View style={styles.classActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setNewClass({
                    grade: item.grade,
                    section: item.section,
                    subject: item.subject,
                    teacher: item.teacher,
                  });
                  setEditId(item.id);
                  setIsEditMode(true);
                  setIsModalVisible(true);
                }}
              >
                <MaterialIcons name="edit" size={20} color="white" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#E53935' }]}
                onPress={() => deleteClass(item.id)}
              >
                <MaterialIcons name="delete" size={20} color="white" />
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {isEditMode ? 'Edit Class' : 'Add New Class'}
              </Text>
              {Object.keys(error).length > 0 && (
                <Text style={styles.errorText}>{Object.values(error).join(' | ')}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Grade"
                value={newClass.grade}
                onChangeText={(text) => setNewClass((prev) => ({ ...prev, grade: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Section"
                value={newClass.section}
                onChangeText={(text) => setNewClass((prev) => ({ ...prev, section: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Subject"
                value={newClass.subject}
                onChangeText={(text) => setNewClass((prev) => ({ ...prev, subject: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Teacher"
                value={newClass.teacher}
                onChangeText={(text) => setNewClass((prev) => ({ ...prev, teacher: text }))}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalButton} onPress={addClass}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <MaterialIcons name="check" size={20} color="white" />
                      <Text style={styles.actionText}>
                        {isEditMode ? 'Update' : 'Add Class'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#E53935' }]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="close" size={20} color="white" />
                    <Text style={styles.actionText}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <MaterialIcons name="add" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    height: '100%',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5722',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
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
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  classText: {
    fontSize: 18,
    color: '#444',
    marginLeft: 10,
    fontWeight: '600',
  },
  classActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#2980B9',
    borderRadius: 25,
  },
  actionText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 35,
    width: '85%',
    borderRadius: 20,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 14,
    marginBottom: 18,
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#555',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
  },
  errorText: {
    color: '#E53935',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Classes;
