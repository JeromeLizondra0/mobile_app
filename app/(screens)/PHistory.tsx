import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker component

const { width } = Dimensions.get('window');

// Typing for payment history
interface PaymentHistoryItem {
  id: number;
  amount: number;
  date: string;
}

export default function PHistory() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  

  const [selectedYear, setSelectedYear] = useState(''); // New state for the selected year
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([
    { id: 1, amount: 100, date: '2025-04-01' },
    { id: 2, amount: 200, date: '2025-04-02' },
    { id: 3, amount: 150, date: '2025-04-03' },
  ]); // Mock payment history data for testing

  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    // Simulate loading data for payment history
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 2-second delay
  }, []);

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

  const renderPaymentItem = ({ item }: { item: PaymentHistoryItem }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentText}>Payment ID: {item.id}</Text>
      <Text style={styles.paymentText}>Amount: P{item.amount}</Text>
      <Text style={styles.paymentText}>Date: {item.date}</Text>
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
        <TouchableOpacity onPress={() => router.push('/notification')} style={styles.notificationBell}>
                <MaterialCommunityIcons name="bell" size={30} color="white" />
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
            <MaterialIcons name="arrow-back-ios" size={28} color="white" />
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
              <Text style={styles.sidebarText}>Upload Payment</Text>
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

      {/* Main Content for Payment History */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>Payment History</Text>

        {/* Subtitle */}
        <Text style={styles.subTitle}>Your recent payment history is listed below</Text>

        {/* New row for S.Y. dropdown and Search bar */}
        <View style={styles.filterContainer}>
          {/* School Year Dropdown */}
          <View style={styles.yearDropdownContainer}>
            <Text style={styles.dropdownLabel}>S.Y.</Text>
            <View style={styles.dropdown}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                style={styles.dropdownPicker}
              >
                <Picker.Item label="Select School Year" value="" />
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
              </Picker>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              // Handle search logic as needed
            />
            <TouchableOpacity style={styles.searchIcon}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Displaying the payment history */}
        {loading ? (
          <ActivityIndicator size="large" color="#2980B9" />
        ) : (
          <FlatList
            data={paymentHistory}
            renderItem={renderPaymentItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
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
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
    marginBottom: 5,
    paddingBottom:10,
  },
  subTitle: {
    fontSize: 14,
    fontStyle: 'italic',  // Italicized text
    marginBottom: 20,
    color: '#7f8c8d',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  yearDropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%', // Adjust the width based on screen size
  },
  dropdownLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    width: 120,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownPicker: {
    width: '100%',
    height: '100%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderRadius: 5,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  searchBar: {
    flex: 1,
    height: 47,
    fontSize: 16,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  paymentItem: {
      padding: 18,  // Slightly larger padding for more breathing room
      marginBottom: 12,  // More space between items for a cleaner look
      backgroundColor: '#fff',
      borderRadius: 15, // Slightly more rounded corners for a softer look
      shadowColor: '#2c3e50', // Darker shadow for a more realistic depth
      shadowOffset: { width: 0, height: 4 },  // A bit more depth with a higher shadow offset
      shadowOpacity: 0.1, // Slightly lighter shadow for a subtler effect
      shadowRadius: 10,  // Increased shadow radius for a smoother, more diffused effect
      elevation: 5, // Slightly higher elevation for Android to create a noticeable lift
      borderColor: '#bdc3c7', // Soft gray border for a refined edge
      borderWidth: 1,  // Subtle border to define the edge
  },
  paymentText: {
    fontSize: 18,  // Larger font size for better readability
    fontWeight: '600', // Bold but not too heavy for a clean look
    color: '#34495e',  // Slightly lighter but still dark for good contrast
    lineHeight: 24, // Increased line height for better text spacing
    letterSpacing: 0.5, // Adding a little letter spacing for modern typography
    fontFamily: 'Helvetica Neue',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
    fontStyle: 'italic', // To differentiate payment method
 },
 modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: 0,
},
  announcementText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2980B9',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2980B9',
    borderRadius: 50,
    padding: 15,
 },
 fabIcon: {
    color: 'white',
    fontSize: 30,
 },
 
});
