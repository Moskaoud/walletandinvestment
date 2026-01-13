
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAppState } from '../context/state';
import { InvestmentOpportunity } from '../types';
import { formatCurrency } from '../utils/format';

const OpportunityListItem: React.FC<{ item: InvestmentOpportunity }> = ({ item }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/opportunity/${item.id}`)} style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{`Expected Return: ${item.expectedReturn * 100}%`}</Text>
      <Text>{`Duration: ${item.duration} months`}</Text>
      <Text>{`Min Investment: ${formatCurrency(item.minInvestment)}`}</Text>
    </TouchableOpacity>
  );
};

const OpportunityList: React.FC = () => {
  const { opportunities, loading } = useAppState();

  if (loading) {
    return <Text>Loading opportunities...</Text>;
  }

  return (
    <FlatList
      data={opportunities}
      renderItem={({ item }) => <OpportunityListItem item={item} />}
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
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OpportunityList;
