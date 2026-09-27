import { TbArrowRight } from 'react-icons/tb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { summaryTableDataAction } from '../actions';
import { Badge } from './badge';
import { CardErrorState } from './cardError';
import { INVESTMENT_CATEGORY_LABELS, TRANSACTION_CATEGORY_LABELS } from '@/constants/overview';

export const SummaryTables = async () => {
  const response = await summaryTableDataAction();

  if (!response.success || !response.data) return <CardErrorState message={response.message} />;

  const { recentTransactions, topInvestments, totalInvested } = response.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* CARD: Últimos Lançamentos */}
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
          {recentTransactions.map((tx, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Badge variant={tx.type === 'INCOME' ? 'income' : 'expense'}>
                  {tx.type === 'INCOME' ? 'Entrada' : 'Saída'}
                </Badge>
                <div>
                  <p className="text-xs font-medium leading-none">{tx.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {TRANSACTION_CATEGORY_LABELS[tx.category] || tx.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-semibold ${
                    tx.type === 'INCOME'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-foreground'
                  }`}
                >
                  {tx.type === 'INCOME' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* CARD: Maiores Ativos */}
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
          {topInvestments.map((inv, i) => {
            const formattedCategory = INVESTMENT_CATEGORY_LABELS[inv.category] || inv.category;

            // Calcula a porcentagem em relação ao totalInvested retornado da Action
            const percentage =
              totalInvested > 0 ? ((inv.totalValue / totalInvested) * 100).toFixed(1) : '0.0';

            return (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px] uppercase border border-blue-500/20">
                    {inv.ticker ? inv.ticker.slice(0, 2) : 'RF'}
                  </div>
                  <div>
                    <p className="text-xs font-medium leading-none">{inv.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {inv.ticker ? `${inv.ticker} • ${formattedCategory}` : formattedCategory}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-foreground">
                    R$ {inv.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {percentage}% da carteira
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
