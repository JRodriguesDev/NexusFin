import { TbArrowUpRight, TbArrowDownRight, TbWallet, TbTrendingUp } from 'react-icons/tb';
import { Card } from '@/components/ui/card';
import { moneyKpipsAction } from '../actions';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { CardErrorState } from './cardError';

export const MoneyKpips = async () => {
  const response = await moneyKpipsAction();
  if (!response.success) return <CardErrorState message={response.message} />;

  const {
    totalIncome,
    totalExpense,
    incomeChange,
    expenseChange,
    balance,
    savingsPercentage,
    totalInvested,
  } = response.data!;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="p-3.5 flex flex-col justify-between border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Total Entradas</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
            <TbArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-foreground">{formatCurrency(totalIncome)}</span>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1 font-medium">
            <span>+{incomeChange}%</span> vs. mês anterior
          </p>
        </div>
      </Card>

      <Card className="p-3.5 flex flex-col justify-between border-l-4 border-l-rose-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Total Saídas</span>
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500">
            <TbArrowDownRight className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-foreground">{formatCurrency(totalExpense)}</span>
          <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5 flex items-center gap-1 font-medium">
            <span>-{expenseChange}%</span> vs. mês anterior
          </p>
        </div>
      </Card>

      <Card className="p-3.5 flex flex-col justify-between border-l-4 border-l-primary bg-primary/5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Saldo do Período</span>
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <TbWallet className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-primary">{formatCurrency(balance)}</span>
          <p className="text-xs text-muted-foreground mt-0.5">
            Economia de {savingsPercentage}% da renda
          </p>
        </div>
      </Card>

      <Card className="p-3.5 flex flex-col justify-between border-l-4 border-l-blue-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Patrimônio Investido</span>
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
            <TbTrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-foreground">{formatCurrency(totalInvested)}</span>
          <p className="text-xs text-muted-foreground mt-0.5">Total acumulado na carteira</p>
        </div>
      </Card>
    </div>
  );
};

export const MoneyKpisSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="p-3.5 flex flex-col justify-between border-l-4 border-l-muted">
          {/* Topo do Card: Título + Ícone */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-7 w-7 rounded-lg" />
          </div>

          {/* Valor Principal + Subtexto */}
          <div className="mt-2 space-y-1.5">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
        </Card>
      ))}
    </div>
  );
};
