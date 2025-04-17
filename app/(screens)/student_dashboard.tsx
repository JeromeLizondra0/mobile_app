import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, FlatList,Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {logout} from '@/services/auth/authService';

const { width } = Dimensions.get('window');

export default function StudentDashboard() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      friction: 8,  // Smoother effect
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

  const handleLogout = async () => {
    try{
    const result = await logout();
          if (result) {
            router.push('/login');
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error: any) {
          Alert.alert('Login Failed', error.message || 'Something went wrong.');
        }
    router.push('/login');
  };

  const handleNotificationClick = () => {
    setIsModalVisible(true);
  };

  const closeNotificationModal = () => {
    setIsModalVisible(false);
  };

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

        {/* Profile Icon - Navigates to preview.tsx */}
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
        </Animated.View>
      )}
      
      <View style={styles.customBox}>
  <View style={styles.textContainer}>
    <Text style={styles.greetingTitle}>Welcome, Jerome!</Text>
    <Text style={styles.greetingMessage}>The harder You work, {"\n"}the more luck You seem to have.</Text>

    {/* Languages */}
    <View style={styles.infoRow}>
          <Entypo name="graduation-cap" size={17} color="black" />
          <Text style={styles.detailText}>Grade: <Text style={styles.boldText}>10</Text></Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome6 name="users-line" size={17} color="black" />
          <Text style={styles.detailText}>Section: <Text style={styles.boldText}>Bayabas</Text></Text>
        </View>
    <View style={styles.infoRow}>
      <MaterialIcons name="language" size={17} color="black" />
      <Text style={styles.detailText}>Languages: <Text style={styles.boldText}>Filipino, English</Text></Text>
    </View>

    {/* Location */}
    <View style={styles.infoRow}>
      <Entypo name="location" size={17} color="black" />
      <Text style={styles.detailText}>Location: <Text style={styles.boldText}>Skina Japan</Text></Text>
    </View>

    {/* Contact */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="contacts" size={17} color="black" />
      <Text style={styles.detailText}>Contact: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text>
    </View>
  </View>

  {/* Profile Image */}
  <Image source={require('@/assets/images/profile-1.jpg')} style={styles.profileImage} />
</View>

      {/* Main Content */}
      <View style={[styles.mainContent, { marginLeft: sidebarVisible ? 250 : 0 }]}>
        <Text style={styles.mainTitle}>Student Dashboard</Text>
        <View style={styles.boxContainer}>
          {/* Classes Box */}
          <TouchableOpacity
            onPress={() => router.push('/classes')}
            style={[styles.box, styles.classesBox]}
          >
            <MaterialCommunityIcons name="school" size={60} color="#fff" />
            <Text style={styles.boxTitle}>Classes</Text>
          </TouchableOpacity>

          {/* Events Box */}
          <TouchableOpacity
            onPress={() => router.push('/events')}
            style={[styles.box, styles.eventsBox]}
          >
            <MaterialCommunityIcons name="calendar" size={60} color="#fff" />
            <Text style={styles.boxTitle}>Events</Text>
          </TouchableOpacity>

          {/* Subjects Box */}
          <TouchableOpacity
            onPress={() => router.push('/subjects')}
            style={[styles.box, styles.subjectsBox]}
          >
            <MaterialCommunityIcons name="book" size={60} color="#fff" />
            <Text style={styles.boxTitle}>Subjects</Text>
          </TouchableOpacity>

          {/* Payments Box */}
          <TouchableOpacity
            onPress={() => router.push('/payments')}
            style={[styles.box, styles.paymentsBox]}
          >
            <MaterialCommunityIcons name="credit-card" size={60} color="#fff" />
            <Text style={styles.boxTitle}>Payments Balance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Announcement Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeNotificationModal}
      >
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
    opacity: 0.3,
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
  mainContent: { paddingHorizontal: 20, paddingTop: 20, flex: 1 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white' },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    backgroundColor: '#2196F3', 
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  boxTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  classesBox: { backgroundColor: '#4CAF50' },
  eventsBox: { backgroundColor: '#FF9800' },
  subjectsBox: { backgroundColor: '#9C27B0' },
  paymentsBox: { backgroundColor: '#2980B9' },
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


  // Box style remains the same
  customBox: {
    opacity: 0.95, // Slightly increased opacity for better visibility
    height: 220, // Adjusted height for better spacing
    padding: 20,
    borderRadius: 12, // Slightly rounded corners for a smoother look
    flexDirection: 'row', // Arrange the text and profile image in a row
    alignItems: 'center', // Vertically center the items
    justifyContent: 'space-between', // Space out the content evenly
    shadowColor: '#000',
    shadowOpacity: 0.2, // Slightly darker shadow for more depth
    shadowRadius: 12, // Increased shadow radius for a smoother effect
    elevation: 6, // Increased elevation for better shadow effect on Android
    marginRight: 70, // Shift the box slightly to the left by adjusting margin
    marginTop: 7, // Increased margin for better separation from other elements
    marginHorizontal: 5, // Added horizontal margin for spacing
    borderWidth: 5, // Light border to enhance the edges
    borderColor: '#E0E0E0', // Light gray border for subtle separation
    backgroundColor: '#f9f9f9', // Subtle light gray background instead of pure white for less glare
  },
  
  textContainer: {
    position: 'absolute', // Positioning the container absolutely within the parent
    top: 20, // Space from the top of the screen
    left: 20, // Space from the left of the screen
    zIndex: 1,  
    flex: 1, // Take remaining space
    justifyContent: 'center', // Center the text vertically
    paddingLeft: 10,},

  greetingTitle: {
    color: 'black',  // Text color black for visibility
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
  },

  greetingMessage: {
    color: 'black',  // Text color black for visibility
    fontSize: 16,
    fontStyle: 'italic',  // Italics for the greeting message
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'white',
    left: 260,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

