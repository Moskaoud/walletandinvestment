
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppState } from '../../context/state';
import { formatCurrency } from '../../utils/format';

const OpportunityDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { opportunities, invest } = useAppState();
  const router = useRouter();
  const [isInvesting, setIsInvesting] = useState(false);

  const opportunity = opportunities.find(op => op.id === id);

  if (!opportunity) {
    return <Text>Opportunity not found.</Text>;
  }

  const handleInvest = async () => {
    setIsInvesting(true);
    try {
      await invest(opportunity.minInvestment, opportunity.id);
      Alert.alert('Success', 'Investment successful!');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{opportunity.name}</Text>
      <Text style={styles.description}>{opportunity.description}</Text>
      <Text>{`Expected Return: ${opportunity.expectedReturn * 100}%`}</Text>
      <Text>{`Duration: ${opportunity.duration} months`}</Text>
      <Text>{`Minimum Investment: ${formatCurrency(opportunity.minInvestment)}`}</Text>
      <Button
        title={`Invest ${formatCurrency(opportunity.minInvestment)}`}
        onPress={handleInvest}
        disabled={isInvesting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
});

export default OpportunityDetailsScreen;
