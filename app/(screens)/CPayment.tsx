import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function UploadPayment() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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

  const handleLogout = () => router.push('/login');
  const handleNotificationClick = () => router.push('/notification');

  const handlePaymentSubmit = async () => {
    if (!paymentAmount || !paymentMethod || !receiptImage) {
      setMessage('Please fill all fields and select a receipt image.');
      return;
    }
    setLoading(true);
    setMessage('');
    setTimeout(() => {
      setLoading(false);
      setMessage('Payment submitted successfully!');
      setPaymentAmount('');
      setPaymentMethod('');
      setReceiptImage(null);
    }, 2000);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setReceiptImage(result.assets[0].uri);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/background.jpg')} style={styles.backgroundImage} />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={openSidebar}><Text style={styles.menuIcon}>☰</Text></TouchableOpacity>
        <View style={styles.topRight}>
          <TouchableOpacity onPress={handleNotificationClick} style={styles.notificationBell}>
            <MaterialCommunityIcons name="bell" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/preview')}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profilePicTop} />
            ) : (
              <Image source={require('@/assets/images/profile-1.jpg')} style={styles.profilePicTop} />
            )}
          </TouchableOpacity>
        </View>
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
            {/** Sidebar Items **/}
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/student_dashboard'); }} style={styles.sidebarItem}>
              <MaterialIcons name="dashboard" size={26} color="white" /><Text style={styles.sidebarText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/PHistory'); }} style={styles.sidebarItem}>
              <MaterialCommunityIcons name="history" size={26} color="white" /><Text style={styles.sidebarText}>Payment History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/CPayment'); }} style={styles.sidebarItem}>
              <FontAwesome6 name="credit-card" size={26} color="white" /><Text style={styles.sidebarText}>Upload Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/DocumentOfStudent'); }} style={styles.sidebarItem}>
              <Entypo name="document" size={26} color="white" /><Text style={styles.sidebarText}>Document of Student</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { closeSidebar(); router.push('/ViewSettings'); }} style={styles.sidebarItem}>
              <MaterialIcons name="settings" size={26} color="white" /><Text style={styles.sidebarText}>View Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <MaterialCommunityIcons name="logout" size={26} color="white" /><Text style={styles.sidebarText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>Upload Proof of Payment</Text>
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {receiptImage ? (
            <Image source={{ uri: receiptImage }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.boxText}>Tap to select image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.formFields}>
          <Text style={styles.fieldLabel}>Amount</Text>
          <TextInput style={styles.fieldInput} placeholder="₱0.00" keyboardType="numeric" value={paymentAmount} onChangeText={setPaymentAmount} />
          <Text style={styles.fieldLabel}>Payment Method</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={paymentMethod}
              onValueChange={(itemValue) => setPaymentMethod(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Method" value="" />
              <Picker.Item label="PayMaya" value="PayMaya" />
              <Picker.Item label="Gcash" value="Gcash" />
              {/* <Picker.Item label="Credit and Debit" value="Credit and Debit" /> */}
            </Picker>
          </View>
          <Text style={styles.fieldLabel}>Date</Text>
          <Text style={styles.fieldValue}>{currentDate}</Text>
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={handlePaymentSubmit} disabled={loading}>
          {loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text style={styles.submitButtonText}>Submit Payment</Text>)}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  backgroundImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.3 },
  topBar: { backgroundColor: '#2980B9', paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuIcon: { color: '#fff', fontSize: 24 },
  topRight: { flexDirection: 'row', alignItems: 'center' },
  notificationBell: { marginRight: 16 },
  profilePicTop: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: 'white' },
  sidebar: { position: 'absolute', top: 0, bottom: 0, width: 240, backgroundColor: '#2980B9', paddingVertical: 20, paddingHorizontal: 16, zIndex: 99 },
  sidebarHeader: { position: 'absolute', top: 16, right: 16 },
  sidebarContent: { flex: 1, justifyContent: 'flex-start', marginTop: 0 },
  sidebarLogo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 8, marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.1)' },
  sidebarText: { color: 'white', fontSize: 18, marginLeft: 12 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  mainContent: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 16 },
  mainTitle: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  imageBox: { height: 180, borderWidth: 2, borderStyle: 'dashed', borderColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  boxText: { color: '#888', fontSize: 16 },
  imagePreview: { width: '100%', height: '100%', borderRadius: 6, resizeMode: 'cover' },
  formFields: { marginBottom: 20 },
  fieldLabel: { fontSize: 20, fontWeight: '500', marginBottom: 4 },
  fieldInput: { height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 12, height: 50, justifyContent: 'center' },
  picker: { height: 50, width: '100%' },
  pickerItem: { height: 50 },
  fieldValue: { fontSize: 20, fontWeight: '500', marginBottom: 12 },
  proofImage: { width: 100, height: 100, borderRadius: 6, marginTop: 8, marginBottom: 12 },
  message: { textAlign: 'center', color: '#2980B9', fontWeight: '500', marginBottom: 12 },
  submitButton: { backgroundColor: '#27AE60', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginBottom: 20 },
  submitButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
});
