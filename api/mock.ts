
import { Balance, InvestmentOpportunity, Transaction } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_BALANCE: Balance = {
  available: 15000,
  invested: 5000,
};

const MOCK_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    id: '1',
    name: 'Real Estate Fund A',
    expectedReturn: 0.12,
    duration: 24,
    minInvestment: 1000,
    description: 'A promising real estate fund with a track record of success.',
  },
  {
    id: '2',
    name: 'Tech Startup Fund B',
    expectedReturn: 0.18,
    duration: 36,
    minInvestment: 5000,
    description: 'Invest in the next generation of technology startups.',
  },
  {
    id: '3',
    name: 'Green Energy Bond',
    expectedReturn: 0.08,
    duration: 12,
    minInvestment: 500,
    description: 'A socially responsible investment in renewable energy projects.',
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'DEPOSIT',
    amount: 20000,
    date: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    type: 'INVEST',
    amount: 5000,
    date: '2023-01-20T14:30:00Z',
  },
];

export const getBalance = async (): Promise<Balance> => {
  await delay(500);
  return MOCK_BALANCE;
};

export const getOpportunities = async (): Promise<InvestmentOpportunity[]> => {
  await delay(1000);
  return MOCK_OPPORTUNITIES;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  await delay(800);
  return MOCK_TRANSACTIONS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const invest = async (amount: number): Promise<Transaction> => {
  await delay(1200);
  if (MOCK_BALANCE.available < amount) {
    throw new Error('Insufficient funds');
  }
  MOCK_BALANCE.available -= amount;
  MOCK_BALANCE.invested += amount;
  const newTransaction: Transaction = {
    id: String(Date.now()),
    type: 'INVEST',
    amount,
    date: new Date().toISOString(),
  };
  MOCK_TRANSACTIONS.push(newTransaction);
  return newTransaction;
};
