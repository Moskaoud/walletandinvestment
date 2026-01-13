
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../context/state';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/format';

const TransactionListItem: React.FC<{ item: Transaction }> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text>{`Type: ${item.type}`}</Text>
    <Text>{`Amount: ${formatCurrency(item.amount)}`}</Text>
    <Text>{`Date: ${formatDate(item.date)}`}</Text>
  </View>
);

const TransactionList: React.FC = () => {
  const { transactions, loading } = useAppState();


  if (loading) {
    return <Text>Loading transactions...</Text>;
  }

  if (transactions.length === 0) {
    return <Text>No transactions yet.</Text>;
  }

  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => <TransactionListItem item={item} />}
      keyExtractor={(item, index) => item.id ? `${item.id}-${index}` : index.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default TransactionList;
