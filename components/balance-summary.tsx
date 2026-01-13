
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppState } from '../context/state';
import { formatCurrency } from '../utils/format';

const BalanceSummary: React.FC = () => {
  const { balance } = useAppState();

  if (!balance) {
    return null;
  }

  const totalBalance = balance.available + balance.invested;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance Summary</Text>
      <View style={styles.row}>
        <Text>Available Balance:</Text>
        <Text>{formatCurrency(balance.available)}</Text>
      </View>
      <View style={styles.row}>
        <Text>Invested Balance:</Text>
        <Text>{formatCurrency(balance.invested)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalText}>Total Balance:</Text>
        <Text style={styles.totalText}>{formatCurrency(totalBalance)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalText: {
    fontWeight: 'bold',
  },
});

export default BalanceSummary;
