
export interface Balance {
  available: number;
  invested: number;
}

export interface InvestmentOpportunity {
  id: string;
  name: string;
  expectedReturn: number;
  duration: number;
  minInvestment: number;
  description: string;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'INVEST';
  amount: number;
  date: string;
}
