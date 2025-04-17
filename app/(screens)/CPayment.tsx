import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker'; // Expo compatible Picker


const { width } = Dimensions.get('window');

export default function CPayment() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [schoolFee, setSchoolFee] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications] = useState([
    "School will be closed for a holiday on May 1st.",
    "New grades have been posted, check your student records.",
    "Parent-teacher meeting scheduled for next week.",
  ]);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

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

  const handleLogout = () => {
    router.push('/login');
  };

  const handleNotificationClick = () => {
    setIsModalVisible(true);
  };

  const closeNotificationModal = () => {
    setIsModalVisible(false);
  };

  const handlePayment = () => {
    // Logic to process payment can be added here
    console.log(`Payment of ${amount} using ${paymentMethod}`);
    alert('Payment Successful!');
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

<View style={styles.mainContent}>
        <Text style={styles.mainTitle}>Create Payment</Text>
        <Text style={styles.subTitle}>Be careful when filling out the forms.</Text>

        {/* Payment Form */}
        <View style={styles.paymentCard}>
          {/* Payment Method Dropdown */}
          <Text style={styles.label}>Select Payment Method:</Text>
          <Picker
            selectedValue={paymentMethod}
            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Payment Method" value="" />
            <Picker.Item label="Gcash" value="Gcash" />
            <Picker.Item label="Paymaya" value="Paymaya" />
            <Picker.Item label="Credit Card" value="Credit Card" />
          </Picker>

          {/* School Fees Dropdown */}
          <Text style={styles.label}>Select School Fee:</Text>
          <Picker
            selectedValue={schoolFee}
            onValueChange={(itemValue) => setSchoolFee(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select School Fee" value="" />
            <Picker.Item label="Books" value="Books" />
            <Picker.Item label="Miscellaneous" value="Miscellaneous" />
            <Picker.Item label="Tuition" value="Tuition" />
            <Picker.Item label="Discount" value="Discount" />
            <Picker.Item label="Esc Grant" value="Esc Grant" />
            <Picker.Item label="ID's" value="ID's" />
            <Picker.Item label="Sling" value="Sling" />
            <Picker.Item label="PE Uniform" value="PE Uniform" />
            <Picker.Item label="Logo" value="Logo" />
            <Picker.Item label="BSP PIN" value="BSP PIN" />
            <Picker.Item label="GSP PIN" value="GSP PIN" />
          </Picker>

          {/* Payment Amount */}
          <Text style={styles.label}>Payment Ammount</Text>

          <TextInput
          
            style={styles.inputField}
            placeholder="Enter Payment Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Payment Button */}
          <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Make Payment</Text>
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
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'black',borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',},
  subTitle: {
    fontSize: 15, // Decrease font size
    fontStyle: 'italic',
    color: '#444',
    textAlign: 'left', // Align text to the left
    marginTop: -10, // Move the text a bit up
    paddingBottom: 20,
  },
  paymentCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputField: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  paymentButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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

  label: { fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333', },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#2980B9',  // Use a more prominent color
    borderWidth: 2,  // Increase the border width for better visibility
    borderRadius: 5,  // Rounded corners
    marginBottom: 20,
    backgroundColor: '#fff',  // White background
    paddingHorizontal: 12,  // Added padding for the text inside the dropdown
    color: 'black',  // Color for the text
    fontSize: 16,  // Font size to improve readability
  },
});
