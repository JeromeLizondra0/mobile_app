import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert, FlatList, ListRenderItem } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useMemo } from 'react';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { logout } from '@/services/auth/authService';

const { width } = Dimensions.get('window');

export default function StudentDashboard() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;


  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8, // Smoother effect
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
    try {
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

  // Define the type for the notification item
  type NotificationItem = {
    id: string;
    title: string;
    message: string;
    time: moment.Moment;
  };

  // Sample notifications data
  const sampleNotifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Class Schedule Posted',
      message: 'Your updated class schedule for Grade 10 is now available.',
      time: moment().subtract(2, 'hours'),
    },
    {
      id: '2',
      title: 'Tuition Payment Reminder',
      message: 'Don’t forget your tuition payment is due next week.',
      time: moment().subtract(1, 'days'),
    },
    {
      id: '3',
      title: 'PTA Meeting',
      message: 'A PTA meeting is scheduled this Friday at 2PM.',
      time: moment().subtract(3, 'days'),
    },
    {
        id: '4',
        title: 'Comfort Zone',
        message: 'If Kalibangon ka, kalibang',
        time: moment().subtract(1, 'year'),
      },
  ];

  // Memoizing renderNotification to optimize re-renders
  const renderNotification: ListRenderItem<NotificationItem> = useMemo(
    () => ({ item }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{moment(item.time).fromNow()}</Text>
      </View>
    ),
    []
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
        <TouchableOpacity style={styles.notificationBell}>
          <MaterialCommunityIcons 
            name="bell" 
            size={30}
            color={'blue'}
          />
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

      <View style={styles.containers}>
        <Text style={styles.header}>Notifications</Text>
        {/* FlatList for performance optimization with larger datasets */}
        <FlatList
          data={sampleNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No notifications available</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative', backgroundColor: '#ffffff' },
  containers:{ padding: 16, paddingTop: 40,marginTop: 50,},
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
    position: 'absolute', // Fixes the top bar at the top
    width: '100%', // Ensures it spans the full width of the screen
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
    marginLeft: 250,
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
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333', // Darker text color for better readability
    marginBottom: 20,
    letterSpacing: 1.2,
    textTransform: 'uppercase', // Adds a bit of modern flair
  },
  card: {
    backgroundColor: '#f8f8f8', // Lighter background for cards
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff', // Adds a pop of color to the card for visual interest
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
});
