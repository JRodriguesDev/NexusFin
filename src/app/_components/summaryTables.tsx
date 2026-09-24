import { TbArrowRight } from 'react-icons/tb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Badge = ({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'income' | 'expense' | 'default';
}) => {
  const styles = {
    income: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    expense: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    default: 'bg-muted text-muted-foreground border-border',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const kpis = {
  totalIncome: 12450.0,
  totalExpense: 4820.5,
  balance: 7629.5,
  totalInvested: 38500.0,
};

const recentTransactions = [
  {
    id: '1',
    description: 'Salário Empresa',
    type: 'INCOME',
    category: 'SALARY',
    amount: 9500.0,
    date: '2026-09-05',
  },
  {
    id: '2',
    description: 'Supermercado Mensal',
    type: 'EXPENSE',
    category: 'FOOD',
    amount: 1250.4,
    date: '2026-09-10',
  },
  {
    id: '3',
    description: 'Conta de Luz & Água',
    type: 'EXPENSE',
    category: 'UTILITIES',
    amount: 380.1,
    date: '2026-09-12',
  },
  {
    id: '4',
    description: 'Projeto Freelance',
    type: 'INCOME',
    category: 'OTHER_INCOME',
    amount: 2950.0,
    date: '2026-09-15',
  },
  {
    id: '5',
    description: 'Assinaturas & Lazer',
    type: 'EXPENSE',
    category: 'ENTERTAINMENT',
    amount: 120.0,
    date: '2026-09-18',
  },
];

const topInvestments = [
  { id: '1', name: 'Itaú Unibanco', ticker: 'ITUB4', category: 'Ações', totalValue: 12400.0 },
  {
    id: '2',
    name: 'CDB Caixinha NuBank',
    ticker: null,
    category: 'Renda Fixa',
    totalValue: 10300.0,
  },
  { id: '3', name: 'Kinea Rendimentos', ticker: 'KNCR11', category: 'FIIs', totalValue: 9800.0 },
  { id: '4', name: 'Apple Inc.', ticker: 'AAPL34', category: 'BDRs', totalValue: 6000.0 },
];

export const SummaryTables = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-base text-foreground">Últimos Lançamentos</h3>
            <p className="text-xs text-muted-foreground">Transações recentes cadastradas</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs h-8 px-2">
            Ver todas <TbArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-2 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Badge variant={tx.type === 'INCOME' ? 'income' : 'expense'}>
                  {tx.type === 'INCOME' ? 'Entrada' : 'Saída'}
                </Badge>
                <div>
                  <p className="text-xs font-medium leading-none">{tx.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tx.category}</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-semibold ${tx.type === 'INCOME' ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}
                >
                  {tx.type === 'INCOME' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-base text-foreground">Maiores Ativos</h3>
            <p className="text-xs text-muted-foreground">Principais posições da carteira</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs h-8 px-2">
            Ir para Investimentos <TbArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-2">
          {topInvestments.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-2 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px] uppercase border border-blue-500/20">
                  {inv.ticker ? inv.ticker.slice(0, 2) : 'RF'}
                </div>
                <div>
                  <p className="text-xs font-medium leading-none">{inv.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 uppercase">
                    {inv.ticker || inv.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-foreground">
                  R$ {inv.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {((inv.totalValue / kpis.totalInvested) * 100).toFixed(1)}% da carteira
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
