
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BalanceSummary from '../../components/balance-summary';
import TransactionList from '../../components/transaction-list';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <BalanceSummary />
      <TransactionList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WalletScreen;
