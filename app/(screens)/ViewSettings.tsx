import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, FlatList, TextInput, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome6, Entypo } from '@expo/vector-icons';


const sidebarItems = [
  { icon: <MaterialIcons name="dashboard" size={30} color="white" />, text: "Dashboard", route: "/student_dashboard" },
  { icon: <MaterialCommunityIcons name="history" size={30} color="white" />, text: "Payment History", route: "/PHistory" },
  { icon: <FontAwesome6 name="credit-card" size={30} color="white" />, text: "Upload Payment", route: "/CPayment" },
  { icon: <Entypo name="document" size={30} color="white" />, text: "Document of Student", route: "/DocumentOfStudent" },
  { icon: <MaterialIcons name="settings" size={30} color="white" />, text: "View Settings", route: "/ViewSettings" },
];

export default function ViewSettings() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const openSidebar = () => setSidebarVisible(true);
  const closeSidebar = () => setSidebarVisible(false);

  const handleLogout = () => router.push('/login');

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validatePassword()) {
      setIsLoading(true);
      setTimeout(() => {
        alert("Password Changed");
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    router.push('/student_dashboard'); // Navigate to the student dashboard

  };


  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/background.jpg')} style={styles.backgroundImage} />
      <View style={styles.topBar}>
        <SidebarButton openSidebar={openSidebar} />
      </View>

      {/* Sidebar */}
      {sidebarVisible && <Sidebar closeSidebar={closeSidebar} router={router} handleLogout={handleLogout} />}

      {/* Change Password Form */}
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>Change Password</Text>
        <PasswordInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <HelpLinks />
        <ActionButtons onSave={handleSave} onCancel={handleCancel} isLoading={isLoading} />
      </View>
    </View>
  );
}
// Sidebar Components

const SidebarButton = ({ openSidebar }: { openSidebar: () => void }) => (
  <TouchableOpacity onPress={openSidebar}>
    <Text style={styles.menuIcon}>☰</Text>
  </TouchableOpacity>
);

const Sidebar = ({ closeSidebar, router, handleLogout }: { closeSidebar: () => void, router: any, handleLogout: () => void }) => (
  <View style={styles.sidebar}>
    <View style={styles.sidebarHeader}>
    <TouchableOpacity onPress={closeSidebar}>
          <MaterialIcons name="arrow-back-ios" size={28} color="white" />
        </TouchableOpacity>
    </View>

    <View style={styles.sidebarContent}>
      <Image source={require('@/assets/images/SCLC.png')} style={styles.sidebarLogo} />
      {sidebarItems.map(item => (
        <SidebarItem key={item.text} {...item} closeSidebar={closeSidebar} router={router} />
      ))}
      <LogoutButton onPress={handleLogout} />
    </View>
  </View>
);

const SidebarItem = ({ icon, text, route, closeSidebar, router }: { icon: any, text: string, route: string, closeSidebar: () => void, router: any }) => (
  <TouchableOpacity onPress={() => { closeSidebar(); router.push(route); }} style={styles.sidebarItem}>
    {icon}
    <Text style={styles.sidebarText}>{text}</Text>
  </TouchableOpacity>
);

const LogoutButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.logoutButton}>
    <MaterialCommunityIcons name="logout" size={30} color="white" />
    <Text style={styles.sidebarText}>Logout</Text>
  </TouchableOpacity>
);

const PasswordInput = ({ placeholder, value, onChangeText }: { placeholder: string, value: string, onChangeText: (text: string) => void }) => (
  <TextInput
    style={styles.inputField}
    placeholder={placeholder}
    secureTextEntry
    value={value}
    onChangeText={onChangeText}
  />
);

const HelpLinks = () => (
  <View style={styles.linkContainer}>

  </View>
);

const ActionButtons = ({ onSave, onCancel, isLoading }: { onSave: () => void, onCancel: () => void, isLoading: boolean }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
      {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Save</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  backgroundImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.3 },
  topBar: { backgroundColor: '#2980B9', paddingTop: 10, paddingBottom: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuIcon: { color: '#fff', fontSize: 24 },
  profilePicTop: { width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: 'white' },
  notificationBell: { position: 'relative', marginLeft: 270 },
  notificationBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: 'red', width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  notificationBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  sidebar: { position: 'absolute', top: 0, bottom: 0, width: 250, backgroundColor: '#2980B9', zIndex: 99, paddingTop: 20, paddingHorizontal: 20, paddingBottom: 350, borderRadius: 10 },
  sidebarHeader: { position: 'absolute', top: 20, right: 16, zIndex: 100 },
  sidebarContent: { flex: 1, justifyContent: 'space-between', paddingTop: 10 },
  sidebarLogo: { width: 120, height: 120, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 12, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)', opacity: 0.9 },
  sidebarText: { color: '#fff', fontSize: 20, marginLeft: 10, fontWeight: '600' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  mainContent: { backgroundColor: 'white', flex: 1, padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputField: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingLeft: 10, borderRadius: 10, fontSize: 16 },
  linkContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,width: '100%', },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#4CAF50', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25 },
  cancelButton: { backgroundColor: '#f44336', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
