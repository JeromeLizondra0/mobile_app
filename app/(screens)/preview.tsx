import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Preview() {
  const [activeTab, setActiveTab] = useState('previewProfile');
  const router = useRouter();

  return (
<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
{/* Top Bar */}
      <View style={styles.topBar}>
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
          <Text style={styles.gradeText}>Grade: 10 (Bayabas)</Text>
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.detailsContainer}>
        {/* Other Profile Details */}
        <View style={styles.detailRow}>
          <Entypo name="graduation-cap" size={24} color="black" />
          <Text style={styles.detailText}>Grade: <Text style={styles.boldText}>10</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome6 name="users-line" size={24} color="black" />
          <Text style={styles.detailText}>Section: <Text style={styles.boldText}>Bayabas</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="human-male-height" size={24} color="black" />
          <Text style={styles.detailText}>Height: <Text style={styles.boldText}>5'7"</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="weight-kilogram" size={24} color="black" />
          <Text style={styles.detailText}>Weight: <Text style={styles.boldText}>65 kg</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="language" size={24} color="black" />
          <Text style={styles.detailText}>Languages: <Text style={styles.boldText}>Filipino, English</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <Entypo name="location" size={24} color="black" />
          <Text style={styles.detailText}>Location: <Text style={styles.boldText}>Skina Japan</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="church" size={24} color="black" />
          <Text style={styles.detailText}>Religion: <Text style={styles.boldText}>Christian</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="contacts" size={24} color="black" />
          <Text style={styles.detailText}>Contact: <Text style={styles.boldText}>(+63) 99 2507 7482</Text></Text>
        </View>
      </View>

      {/* School Details Section */}
      <View style={styles.schoolDetailsContainer}>
        <Text style={styles.sectionTitle}>School Details</Text>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="school" size={24} color="black" />
          <Text style={styles.detailText}>School Name: <Text style={styles.boldText}>Santol National High School</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text style={styles.detailText}>Address: <Text style={styles.boldText}>Skina, Mercado</Text></Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="phone" size={24} color="black" />
          <Text style={styles.detailText}>Contact: <Text style={styles.boldText}>(+63) 99 1234 5678</Text></Text>
        </View>
      </View>

      {/* Empty space at the bottom to make sure the scroll works */}
      <View style={{ height: 10 }} />
       {/* Subjects Section */}
       <View style={styles.subjectsContainer}>
        <Text style={styles.sectionTitle}>Subjects</Text>
        <View style={styles.subjectRow}>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectText}>English</Text>
          </View>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectText}>Filipino</Text>
          </View>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectText}>Math</Text>
          </View>
        </View>
        <View style={styles.subjectRow}>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectText}>MAPEH</Text>
          </View>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectText}>History</Text>
          </View>
          <View style={styles.subjectBox}>
            <Text style={styles.subjectText}>TLE</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  topBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  tab: { padding: 10, marginHorizontal: 50 },
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
    top: 280,              // Adjust the top value to ensure it doesn't overlap
    left: 0,          
    padding: 10,           // Padding around the text
    borderRadius: 8,       // Optional: Rounded corners for text box
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent background
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
    marginTop: 20, // Adjust spacing to ensure the content doesn't overlap the image
    width: '100%',
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
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
    color: '#333',
    marginBottom: 10,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subjectBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  schoolDetailsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
