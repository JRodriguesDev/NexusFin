export type MoneyKpisData = {
  totalIncome: number;
  totalExpense: number;
  incomeChange: number;
  expenseChange: number;
  balance: number;
  savingsPercentage: number;
  totalInvested: number;
};

export type CashFlowDataItem = {
  month: string;
  income: number;
  expense: number;
};

type InvestmentCategoryItem = {
  name: string;
  amount: number;
  percent: string;
};

type InvestmentRiskItem = {
  name: string;
  amount: number;
  percent: string;
};

export type GraphicsData = {
  cashFlow: CashFlowDataItem[];
  investimentByCategory: InvestmentCategoryItem[];
  investimentByRisk: InvestmentRiskItem[];
};

export type RecentTransactionItem = {
  description: string;
  type: string;
  category: string;
  amount: number;
  date: Date;
};

export type TopInvestmentItem = {
  name: string;
  ticker: string | null;
  category: string;
  totalValue: number;
};

export type SummaryTablesData = {
  recentTransactions: RecentTransactionItem[];
  topInvestments: TopInvestmentItem[];
  totalInvested: number;
};
