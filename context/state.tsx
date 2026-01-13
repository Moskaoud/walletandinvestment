
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Balance, InvestmentOpportunity, Transaction } from '../types';
import { getBalance, getOpportunities, getTransactions, invest as apiInvest } from '../api/mock';

interface AppState {
  balance: Balance | null;
  opportunities: InvestmentOpportunity[];
  transactions: Transaction[];
  loading: boolean;
  invest: (amount: number, opportunityId: string) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [opportunities, setOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [balanceData, opportunitiesData, transactionsData] = await Promise.all([
          getBalance(),
          getOpportunities(),
          getTransactions(),
        ]);
        setBalance(balanceData);
        setOpportunities(opportunitiesData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const invest = async (amount: number, opportunityId: string) => {
    if (!balance || balance.available < amount) {
      throw new Error('Insufficient funds');
    }

    try {
      const newTransaction = await apiInvest(amount);
      setBalance(prevBalance => {
        if (!prevBalance) return null;
        return {
          ...prevBalance,
          available: prevBalance.available - amount,
          invested: prevBalance.invested + amount,
        };
      });
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
    } catch (error) {
      console.error('Investment failed', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ balance, opportunities, transactions, loading, invest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
