import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function Preview() {
  const [activeTab, setActiveTab] = useState('previewProfile');
  const router = useRouter();

  
  
  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
  <TouchableOpacity
    onPress={() => { router.push('/student_dashboard'); }}
    style={styles.tab}
  >
    <Text style={styles.topBarText}>Dashboard</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => { setActiveTab('editProfile'); router.push('/Profile-Edit'); }}
    style={[styles.tab, activeTab === 'editProfile' && styles.activeTab]}
  >
    <Text style={[styles.topBarText, activeTab === 'editProfile' && styles.activeTabText]}>Edit Profile</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => { setActiveTab('previewProfile'); router.push('/preview'); }}
    style={[styles.tab, activeTab === 'previewProfile' && styles.activeTab]}
  >
    <Text style={[styles.topBarText, activeTab === 'previewProfile' && styles.activeTabText]}>Preview Profile</Text>
  </TouchableOpacity>
</View>


      {/* Profile Preview Content */}
      <View style={styles.profileContainer}>
        {/* Profile Image */}
        <Image 
          source={require('@/assets/images/profile-1.jpg')} // Replace with your correct path
          style={styles.profileImage} 
          resizeMode="cover"
        />
        
        {/* Profile Text */}
        <View style={styles.textContainer}>
          <Text style={styles.profileText}>Lizondra, 22</Text>
          <Text style={styles.gradeText}>Grade: 10 (Section: Bayabas)</Text>
          <Text style={styles.gradeText}>LRN: 12318927389</Text>

        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Student Details</Text>
        <View style={styles.detailRow}><Entypo name="user" size={24} color="black" /><Text style={styles.detailText}>Firstname: <Text style={styles.boldText}>Jerome</Text></Text></View>
        <View style={styles.detailRow}><FontAwesome name="user-circle-o" size={24} color="black" /><Text style={styles.detailText}>Lastname: <Text style={styles.boldText}>Lizondra</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="human-male" size={24} color="black" /><Text style={styles.detailText}>Age: <Text style={styles.boldText}>101</Text></Text></View>
        <View style={styles.detailRow}><FontAwesome6 name="users-line" size={18} color="black" /><Text style={styles.detailText}>Section: <Text style={styles.boldText}>Bayabas</Text></Text></View>
        <View style={styles.detailRow}><FontAwesome5 name="birthday-cake" size={24} color="black" /><Text style={styles.detailText}>Birthday: <Text style={styles.boldText}>Nov. 01, 2000</Text></Text></View>
        <View style={styles.detailRow}><Entypo name="location" size={24} color="black" /><Text style={styles.detailText}>Address: <Text style={styles.boldText}>Skina Japan</Text></Text></View>
        <View style={styles.detailRow}><MaterialIcons name="email" size={24} color="black" /><Text style={styles.detailText}>Email Address: <Text style={styles.boldText}>jeromelizondra123@gmail.com</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="contacts" size={24} color="black" /><Text style={styles.detailText}>Contact: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text></View>
      </View>

      {/* Father's Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Father's Details</Text>
        <View style={styles.detailRow}><Entypo name="user" size={24} color="black" /><Text style={styles.detailText}>Firstname: <Text style={styles.boldText}>Father</Text></Text></View>
        <View style={styles.detailRow}><FontAwesome name="user-circle-o" size={24} color="black" /><Text style={styles.detailText}>Lastname: <Text style={styles.boldText}>Earth</Text></Text></View>
        <View style={styles.detailRow}><Entypo name="location" size={24} color="black" /><Text style={styles.detailText}>Address: <Text style={styles.boldText}>Skina Japan</Text></Text></View>
        <View style={styles.detailRow}><MaterialIcons name="email" size={24} color="black" /><Text style={styles.detailText}>Email Address: <Text style={styles.boldText}>Father@gmail.com</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="contacts" size={24} color="black" /><Text style={styles.detailText}>Contact: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text></View>
      </View>

      {/* Mother's Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Mother's Maiden Details</Text>
        <View style={styles.detailRow}><Entypo name="user" size={24} color="black" /><Text style={styles.detailText}>Firstname: <Text style={styles.boldText}>Mother</Text></Text></View>
        <View style={styles.detailRow}><FontAwesome name="user-circle-o" size={24} color="black" /><Text style={styles.detailText}>Lastname: <Text style={styles.boldText}>Earth</Text></Text></View>
        <View style={styles.detailRow}><Entypo name="location" size={24} color="black" /><Text style={styles.detailText}>Address: <Text style={styles.boldText}>Skina Japan</Text></Text></View>
        <View style={styles.detailRow}><MaterialIcons name="email" size={24} color="black" /><Text style={styles.detailText}>Email Address: <Text style={styles.boldText}>Mother@gmail.com</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="contacts" size={24} color="black" /><Text style={styles.detailText}>Contact No.: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text></View>
      </View>

      {/* Guardian's Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Guardian's Details</Text>
        <View style={styles.detailRow}><Entypo name="user" size={24} color="black" /><Text style={styles.detailText}>Firstname: <Text style={styles.boldText}>Guar</Text></Text></View>
        <View style={styles.detailRow}><FontAwesome name="user-circle-o" size={24} color="black" /><Text style={styles.detailText}>Lastname: <Text style={styles.boldText}>Dian</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="robot-love" size={24} color="black" /><Text style={styles.detailText}>Relationship: <Text style={styles.boldText}>Tig Hugas</Text></Text></View>
        <View style={styles.detailRow}><Entypo name="location" size={24} color="black" /><Text style={styles.detailText}>Address: <Text style={styles.boldText}>Skina Japan</Text></Text></View>
        <View style={styles.detailRow}><MaterialIcons name="email" size={24} color="black" /><Text style={styles.detailText}>Email Address: <Text style={styles.boldText}>Guardian@gmail.com</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="contacts" size={24} color="black" /><Text style={styles.detailText}>Contact No.: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text></View>
      </View>

      {/* Emergency Contact */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>In Case of Emergency</Text>
        <View style={styles.detailRow}><Entypo name="user" size={24} color="black" /><Text style={styles.detailText}>Contact Person: <Text style={styles.boldText}>Shesh</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="robot-love" size={24} color="black" /><Text style={styles.detailText}>Relationship: <Text style={styles.boldText}>Ex</Text></Text></View>
        <View style={styles.detailRow}><Entypo name="location" size={24} color="black" /><Text style={styles.detailText}>Address: <Text style={styles.boldText}>Skina Japan</Text></Text></View>
        <View style={styles.detailRow}><MaterialCommunityIcons name="contacts" size={24} color="black" /><Text style={styles.detailText}>Contact No.: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  topBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  tab: { padding: 10, marginHorizontal: 20 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#0066cc' },
  topBarText: { fontSize: 16, color: '#000' },
  activeTabText: { color: '#0066cc' },
  profileContainer: { alignItems: 'center', marginTop: 20 },
  profileImage: { 
    width: '100%',  // Makes the image take up the full width of the screen
    height: 350, 
  },
  textContainer: {
    position: 'absolute',  // Positions the text absolutely over the image
    top: 260,              // Adjust the top value to ensure it doesn't overlap
    left: 0,          
    padding: 10,           // Padding around the text
    borderRadius: 8,       // Optional: Rounded corners for text box
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  },
  profileText: {
    fontSize: 24,  // Adjust font size for clarity
    color: 'black',
    fontWeight: 'bold',
  },
  gradeText: {
    fontSize: 18,  // Slightly smaller font for grade/section
    color: 'black',
  },
  detailsContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
   detailText: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  subjectsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#162938',
  },
});
