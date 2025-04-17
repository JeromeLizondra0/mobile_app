import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker'; // Used for picking documents

const { width } = Dimensions.get('window');

export default function DocumentOfStudent() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDocumentDetailsVisible, setIsDocumentDetailsVisible] = useState(false); // State to toggle document details modal
  const [selectedDocument, setSelectedDocument] = useState<any>(null); // Store selected document
  const [notifications] = useState([
    "School will be closed for a holiday on May 1st.",
    "New grades have been posted, check your student records.",
    "Parent-teacher meeting scheduled for next week.",
  ]);

  const slideAnim = useRef(new Animated.Value(-width)).current;

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8, 
      tension: 100,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.spring(slideAnim, {
      toValue: -width,
      friction: 8,
      tension: 100,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handleNotificationClick = () => {
    setIsModalVisible(true);
  };

  const closeNotificationModal = () => {
    setIsModalVisible(false);
  };

  const handleDocumentCardClick = (title: string) => {
    // Open the document details modal with the document title
    setSelectedDocument(title);
    setIsDocumentDetailsVisible(true);
  };

  const closeDocumentDetails = () => {
    setIsDocumentDetailsVisible(false);
  };

  const handleUploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/*' });
      if (result.type === 'success') {
        alert(`Document selected: ${result.name}`);
        // Here you can handle the upload logic to a server or store it locally
      }
    } catch (error) {
      alert('Error selecting document');
    }
  };

  const renderDocumentCard = (title: string) => (
    <View style={styles.documentCard}>
      <MaterialCommunityIcons name="file-document" size={30} color="#2980B9" />
      <Text style={styles.documentCardText}>{title}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={() => handleDocumentCardClick(title)}>
        <Text style={styles.cardButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('@/assets/images/background.jpg')} style={styles.backgroundImage} />

      <View style={styles.topBar}>
        {/* Menu Button */}
        <TouchableOpacity onPress={openSidebar}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        {/* Notification Bell Icon */}
        <TouchableOpacity onPress={handleNotificationClick} style={styles.notificationBell}>
          <MaterialCommunityIcons name="bell" size={30} color="white" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>{notifications.length}</Text>
          </View>
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => router.push('/preview')}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profilePicTop} />
          ) : (
            <Image source={require('@/assets/images/profile-1.jpg')} style={styles.profilePicTop} />
          )}
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {sidebarVisible && (
        <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
          <View style={styles.sidebarHeader}>
            <TouchableOpacity onPress={closeSidebar}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sidebarContent}>
            {/* Sidebar Items */}
            <View style={styles.sidebarContent}>
            <Image source={require('@/assets/images/SCLC.png')} style={styles.sidebarLogo} />
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/student_dashboard'); }} style={styles.sidebarItem}>
            <MaterialIcons name="dashboard" size={30} color="white" />              
            <Text style={styles.sidebarText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/PHistory'); }} style={styles.sidebarItem}>
              <MaterialCommunityIcons name="history" size={30} color="white" />
              <Text style={styles.sidebarText}>Payment History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/CPayment'); }} style={styles.sidebarItem}>
              <FontAwesome6 name="credit-card" size={30} color="white" />
              <Text style={styles.sidebarText}>Create Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/DocumentOfStudent'); }} style={styles.sidebarItem}>
              <Entypo name="document" size={30} color="white" />
              <Text style={styles.sidebarText}>Document of Student</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/ViewSettings'); }} style={styles.sidebarItem}>
              <MaterialIcons name="settings" size={30} color="white" />
              <Text style={styles.sidebarText}>View Settings</Text>
            </TouchableOpacity>
            
            {/* Logout Button */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <MaterialCommunityIcons name="logout" size={30} color="white" />
              <Text style={styles.sidebarText}>Logout</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Animated.View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>Welcome, Jerome!</Text>
        <Text style={styles.secondaryText}>Manage your documents here and stay updated with your records.</Text>
        
        <View style={styles.cardContainer}>
          {renderDocumentCard('Student Transcript')}
          {renderDocumentCard('Report Cards')}
        </View>

        <Text style={styles.documentText}>Other Documents:</Text> 
        <View style={styles.cardContainer}>
          {renderDocumentCard('Enrollment Verification')}
          {renderDocumentCard('GOOD MORAL')}
        </View>

        <Text style={styles.footerText}>All documents are securely stored and can be accessed at any time for your review.</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument}>
          <Text style={styles.uploadButtonText}>Upload New Document</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={closeNotificationModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Announcements</Text>
            <FlatList
              data={notifications}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.announcementText}>{item}</Text>
              )}
            />
            <TouchableOpacity onPress={closeNotificationModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Document Details Modal */}
      <Modal visible={isDocumentDetailsVisible} animationType="slide" transparent={true} onRequestClose={closeDocumentDetails}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Document Details</Text>
            <Text style={styles.announcementText}>You are viewing details for: {selectedDocument}</Text>
            <TouchableOpacity onPress={closeDocumentDetails} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.1, // Reduced opacity for better text visibility
  },
  topBar: {
    backgroundColor: '#2980B9',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: { color: '#fff', fontSize: 24 },
  profilePicTop: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  notificationBell: {
    position: 'relative',
    marginLeft: 270,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#2980B9',
    zIndex: 99,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 350,
    borderRadius: 10,
  },
  sidebarHeader: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 100,
  },
  sidebarContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  sidebarLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.9,
  },
  sidebarText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
  },
  secondaryText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,

  },
  documentCard: {
    backgroundColor: '#f0f8ff',
    width: '48%',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    elevation: 5, // Added shadow effect for depth
  },
  documentCardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  cardButton: {
    marginTop: 10,
    backgroundColor: '#2980B9',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  documentDetails: {
    marginBottom: 20,
  },
  documentText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  documentItem: {
    fontSize: 16,
    marginLeft: 20,
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  announcementText: { fontSize: 16, marginBottom: 10 },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
