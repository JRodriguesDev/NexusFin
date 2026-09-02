import { TbArrowDownLeft, TbArrowUpRight } from 'react-icons/tb';

export const transactionConfigStyles = {
  INCOME: {
    icon: TbArrowDownLeft,
    iconBgColor: 'bg-emerald-500/10',
    iconTextColor: 'text-emerald-500',
    amountColor: 'text-emerald-500',
    prefix: '+',
  },
  EXPENSE: {
    icon: TbArrowUpRight,
    iconBgColor: 'bg-red-500/10',
    iconTextColor: 'text-red-500',
    amountColor: 'text-red-500',
    prefix: '-',
  },
};

export const transactionCategoryConfig = {
  SALARY: {
    label: 'Renda',
    badgeStyle: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
  },
  FOOD: {
    label: 'Alimentação',
    badgeStyle: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
  },
  UTILITIES: {
    label: 'Contas',
    badgeStyle: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  },
  ENTERTAINMENT: {
    label: 'Lazer',
    badgeStyle: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
  },
  HEALTH: {
    label: 'Saúde',
    badgeStyle: 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20',
  },
  TRANSPORT: {
    label: 'Transporte',
    badgeStyle: 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20',
  },
  OTHER: {
    label: 'Outros',
    badgeStyle: 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20',
  },
};
