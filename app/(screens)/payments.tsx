import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const paymentData = [
  { label: 'Tuition Fee', amount: '₱500', status: 'Unpaid', icon: 'university' },
  { label: 'Library Fee', amount: '₱50', status: 'Paid', icon: 'book' },
  { label: 'Laboratory Fee', amount: '₱120', status: 'Unpaid', icon: 'flask' },
  { label: 'Miscellaneous Fee', amount: '₱80', status: 'Paid', icon: 'clipboard-list' },
];

const Payments = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <Text style={styles.description}>Here are your recent fees and their status.</Text>

      {paymentData.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name={item.icon} size={28} color="#4A90E2" style={styles.icon} />
            <View>
              <Text style={styles.paymentLabel}>{item.label}</Text>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          </View>

          <View style={[styles.status, item.status === 'Paid' ? styles.paid : styles.unpaid]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#F4F7FB',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#D5D8DC',
  },
  description: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 24,
    fontStyle: 'italic',
    textAlign: 'left',
    lineHeight: 22,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 16,
  },
  paymentLabel: {
    fontSize: 20,
    color: '#34495E',
    fontWeight: '600',
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: '700',
  },
  status: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  paid: {
    backgroundColor: '#27AE60',
  },
  unpaid: {
    backgroundColor: '#E74C3C',
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

export default Payments;
