import { ChartConfig } from '@/components/ui/chart';

export const monthNames = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

export const graphicColors = {
  income: '#10b981', // Emerald 500
  expense: '#f43f5e', // Rose 500
  blue: '#3b82f6', // Blue 500
  amber: '#f59e0b', // Amber 500
  violet: '#8b5cf6', // Violet 500
};

export const categoryLabels = {
  fixedIncome: 'Renda Fixa',
  stock: 'Ações',
  fund: 'Fundos Imob.',
  bdr: 'BDRs / Int.',
};

export const investmentChartConfig = {
  amount: { label: 'Valor (R$)' },
} satisfies ChartConfig;

// Mapeamento de cores para a rosca de investimentos (para quando não vier 'fill' do backend)
export const categoryColors = [
  graphicColors.blue,
  graphicColors.income,
  graphicColors.amber,
  graphicColors.violet,
];

export const cashFlowChartConfig = {
  income: {
    label: 'Entradas',
    color: graphicColors.income,
  },
  expense: {
    label: 'Saídas',
    color: graphicColors.expense,
  },
} satisfies ChartConfig;
