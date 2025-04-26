import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import moment from 'moment';

export default function NotificationDetails() {
  const router = useRouter();
  
  // Get notification data passed as parameters
  const { notification } = router.query;

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Notification not found.</Text>
      </View>
    );
  }

  const { title, message, time } = notification;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{moment(time).format('MMMM Do YYYY, h:mm a')}</Text>
      <Text style={styles.message}>{message}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    lineHeight: 24,
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
