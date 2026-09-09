import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TbPigMoney, TbChartPie } from 'react-icons/tb';
import { formatCurrency } from '@/lib/utils';

const mockInvestments = [
  {
    id: '1',
    name: 'CDB Banco Inter 110% CDI',
    category: 'Renda Fixa',
    quantity: 1,
    averagePrice: 5000.0,
  },
  {
    id: '2',
    name: 'ITUB4 (Itaú Unibanco)',
    category: 'Ações',
    quantity: 150,
    averagePrice: 32.5,
  },
  {
    id: '3',
    name: 'Bitcoin (BTC)',
    category: 'Criptomoedas',
    quantity: 0.05,
    averagePrice: 350000.0,
  },
  {
    id: '4',
    name: 'FII MXRF11',
    category: 'Fundos Imobiliários',
    quantity: 300,
    averagePrice: 10.45,
  },
];

export const InvestimentStatus = () => {
  // Cálculos do Portfólio
  const totalInvested = mockInvestments.reduce(
    (acc, curr) => acc + curr.quantity * curr.averagePrice,
    0
  );

  // Agrupamento por Categoria para o Gráfico Simples
  const categoryTotals = mockInvestments.reduce(
    (acc, curr) => {
      const total = curr.quantity * curr.averagePrice;
      acc[curr.category] = (acc[curr.category] || 0) + total;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <Card className="md:col-span-1 bg-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Custo Total de Aquisição</CardTitle>
          <TbPigMoney className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{formatCurrency(totalInvested)}</div>
          <p className="text-xs text-muted-foreground mt-1">Soma de todos os aportes</p>
        </CardContent>
      </Card>

      {/* Card: Distribuição por Categoria (Gráfico Visual Simples) */}
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Distribuição da Carteira</CardTitle>
          <TbChartPie className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="mt-4">
          <div className="space-y-4">
            {Object.entries(categoryTotals).map(([category, value]) => {
              const percentage = ((value / totalInvested) * 100).toFixed(1);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{category}</span>
                    <span className="text-muted-foreground">
                      {percentage}% ({formatCurrency(value)})
                    </span>
                  </div>
                  {/* Barra de Progresso Customizada */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all duration-500 ease-in-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
