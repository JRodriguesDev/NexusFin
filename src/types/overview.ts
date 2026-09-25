export type MoneyKpisData = {
  totalIncome: number;
  totalExpense: number;
  incomeChange: number;
  expenseChange: number;
  balance: number;
  savingsPercentage: number;
  totalInvested: number;
};

type CashFlowDataItem = {
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
