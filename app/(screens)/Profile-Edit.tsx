    import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
    import { useState } from 'react';
    import { useRouter } from 'expo-router';
    import * as ImagePicker from 'expo-image-picker';
    import { Picker } from '@react-native-picker/picker';

    export default function ProfileEdit() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [suffix, setSuffix] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [gender, setGender] = useState('');
    const [customGender, setCustomGender] = useState(''); // State for custom gender input
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [languages, setLanguages] = useState('');
    const [hometown, setHometown] = useState('');
    const [religiousViews, setReligiousViews] = useState('');
    const [activeTab, setActiveTab] = useState('editProfile');
    const router = useRouter();

    // Image picker function
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled && result.assets[0]?.uri) {
        setProfileImage(result.assets[0].uri);
        }
    };

    // Save or Update Profile, navigate to Preview Page
    const saveProfile = () => {
        router.push('/student_dashboard');
    };

    return (
        <ScrollView style={styles.container}>
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

        <View style={styles.formBox}>
            {/* Profile Picture */}
            <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.uploadBox}>
                {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profilePic} />
                ) : (
                <Text style={styles.uploadText}>Upload your Profile pic</Text>
                )}
            </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
            {/* Last Name */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#888"
                value={lastname}
                onChangeText={setLastname}
                />
                {lastname ? <Text style={styles.floatingLabel}>Last Name</Text> : null}
            </View>

            {/* First Name */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#888"
                value={firstname}
                onChangeText={setFirstname}
                />
                {firstname ? <Text style={styles.floatingLabel}>First Name</Text> : null}
            </View>

            {/* Middle Name */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Middle Name"
                placeholderTextColor="#888"
                value={middlename}
                onChangeText={setMiddlename}
                />
                {middlename ? <Text style={styles.floatingLabel}>Middle Name</Text> : null}
            </View>

            {/* Suffix */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Suffix"
                placeholderTextColor="#888"
                value={suffix}
                onChangeText={setSuffix}
                />
                {suffix ? <Text style={styles.floatingLabel}>Suffix</Text> : null}
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                />
                {email ? <Text style={styles.floatingLabel}>Email</Text> : null}
            </View>

            {/* Contact Number */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Contact Number"
                placeholderTextColor="#888"
                value={contactNumber}
                onChangeText={(text) => {
                    if (/^[0-9]*$/.test(text)) setContactNumber(text);
                }}
                keyboardType="numeric"
                />
                {contactNumber ? <Text style={styles.floatingLabel}>Contact Number</Text> : null}
            </View>

            {/* Height */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Height"
                placeholderTextColor="#888"
                value={height}
                onChangeText={setHeight}
                />
                {height ? <Text style={styles.floatingLabel}>Height</Text> : null}
            </View>

            {/* Weight */}
            <View style={styles.inputWrapper}>
                <TextInput
                style={styles.input}
                placeholder="Weight"
                placeholderTextColor="#888"
                value={weight}
                onChangeText={setWeight}
                />
                {weight ? <Text style={styles.floatingLabel}>Weight</Text> : null}
            </View>

            {/* Languages Spoken */}
            <View style={styles.inputWrapper}>
                <Picker
                selectedValue={languages}
                onValueChange={(value) => setLanguages(value)}
                style={[styles.input, { height: 50 }]}
                >
                <Picker.Item label="Select a Language" value="" />
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Filipino" value="filipino" />
                <Picker.Item label="Bisaya" value="bisaya" />
                </Picker>
                {languages ? <Text style={styles.floatingLabel}>Languages Spoken</Text> : null}
            </View>

            {/* Gender Picker */}
            <View style={styles.inputWrapper}>
                <Picker
                selectedValue={gender}
                onValueChange={(value) => {
                    setGender(value);
                    if (value !== 'other') setCustomGender('');
                }}
                style={[styles.input, { height: 50 }]}
                >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
                </Picker>
                {gender ? <Text style={styles.floatingLabel}>Gender</Text> : null}
            </View>

            {/* Custom Gender Input */}
            {gender === 'other' && (
                <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Custom Gender"
                    placeholderTextColor="#888"
                    value={customGender}
                    onChangeText={setCustomGender}
                />
                {customGender ? <Text style={styles.floatingLabel}>Custom Gender</Text> : null}
                </View>
            )}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
    topBar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
        formBox: {
            backgroundColor: '#eaeaea',
            padding: 20,
            borderRadius: 15,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 4,
        },
    tab: { padding: 10, marginHorizontal: 50 },
    activeTab: { borderBottomWidth: 2, borderBottomColor: '#0066cc' },
    topBarText: { fontSize: 16, color: '#000' },
    activeTabText: { color: '#0066cc' },
    profileImageContainer: { alignItems: 'center', marginBottom: 20 },
    uploadBox: { width: 120, height: 120, backgroundColor: '#f2f2f2', borderRadius: 60, justifyContent: 'center', alignItems: 'center' },
    profilePic: { width: 120, height: 120, borderRadius: 60 },
    uploadText: { textAlign: 'center', color: '#888' },
    formContainer: { marginBottom: 20 },
    inputWrapper: { marginBottom: 20 },
    input: { padding: 10, borderWidth: 1, borderColor: '#333', borderRadius: 5, fontSize: 20, color: '#333' },
    floatingLabel: { position: 'absolute', top: -12, left: 10, fontSize: 12, color: '#0066cc' },
    saveButton: { backgroundColor: '#0066cc', padding: 12, borderRadius: 5, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontSize: 16 },
    });
