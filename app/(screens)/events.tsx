import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const eventsData = [
  { id: '1', title: 'Parent-Teacher Meeting', date: '2025-04-10', time: '9:00 AM', icon: 'account-group' },
  { id: '2', title: 'Sports Day', date: '2025-04-15', time: '10:00 AM', icon: 'soccer' },
  { id: '3', title: 'School Play', date: '2025-04-20', time: '2:00 PM', icon: 'theater' },
];

export default function EventsPage() {
  const [calendarVisible, setCalendarVisible] = useState(false);

  // Marked dates for the calendar
  const markedDates = {
    '2025-04-10': { marked: true, dotColor: '#FF5722' }, // Larger red circle
    '2025-04-15': { marked: true, dotColor: '#FF5722' },
    '2025-04-20': { marked: true, dotColor: '#FF5722' },
  };

  return (
    <View style={styles.container}>
      {/* Events Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => setCalendarVisible(true)}>
          <MaterialCommunityIcons name="calendar" size={24} color="white" />
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
      </View> */}

      {/* Events List */}
      <ScrollView contentContainerStyle={styles.eventsList}>
        {eventsData.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <MaterialCommunityIcons name={event.icon} size={80} color="#2196F3" style={styles.eventIcon} />
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date} at {event.time}</Text>
              <View style={styles.countdownContainer}>
                {/* <Text style={styles.countdownText}>Countdown:</Text> */}
                {/* <Text style={styles.countdown}>3 Days</Text> */}
              </View>
             
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Calendar Modal */}
      {/* <Modal visible={calendarVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>📆 Event Calendar</Text>
            <Calendar
              markedDates={markedDates}
              theme={{
                calendarBackground: '#ffffff',
                todayTextColor: '#0066CC',
                arrowColor: '#0066CC',
                dotColor: '#FF5722', // Red dot for marked dates
                selectedDotColor: '#fff', // White dot for selected date
                textDayFontWeight: '600',
                textMonthFontWeight: 'bold',
              }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarVisible(false)}>
              <MaterialCommunityIcons name="close" size={20} color="#fff" />
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2980B9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  eventsList: {
    flexGrow: 1,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  eventIcon: {
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    padding: 18,
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  countdownContainer: {
    marginBottom: 10,
  },
  countdownText: {
    fontSize: 14,
    color: '#2196F3',
  },
  countdown: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF5722',
  },
  viewButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#2980B9',
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#162938',
  },
  closeButton: {
    flexDirection: 'row',
    backgroundColor: '#162938',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
});
