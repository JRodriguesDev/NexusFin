import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TbPlus, TbPigMoney, TbDotsVertical, TbEdit, TbHistory, TbChartPie } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// --- MOCK DATA (Posições Consolidadas) ---
// Na prática, o backend calculará o "averagePrice" e "quantity"
// somando o histórico de compras de cada ativo.
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

export default function InvestmentsPage() {
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

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meus Investimentos</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe a consolidação dos seus ativos e histórico de aportes.
          </p>
        </div>
        <Button className="gap-2">
          <TbPlus className="h-4 w-4" />
          Novo Aporte
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card: Total Alocado */}
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
      </div>

      {/* Tabela de Inventário Consolidado */}
      <Card>
        <CardHeader>
          <CardTitle>Posições Consolidadas</CardTitle>
          <CardDescription>Resumo dos seus ativos baseado no histórico de aportes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-left text-muted-foreground">
                  <th className="p-4 font-medium">Ativo</th>
                  <th className="p-4 font-medium">Categoria</th>
                  <th className="p-4 font-medium text-right">Quantidade</th>
                  <th className="p-4 font-medium text-right">Preço Médio</th>
                  <th className="p-4 font-medium text-right">Custo Total</th>
                  <th className="p-4 font-medium text-center w-16">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockInvestments.map((asset) => {
                  const totalPosition = asset.quantity * asset.averagePrice;

                  return (
                    <tr key={asset.id} className="transition-colors hover:bg-muted/50">
                      <td className="p-4 font-medium">{asset.name}</td>
                      <td className="p-4">
                        <Badge variant="outline" className="font-normal text-xs">
                          {asset.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-medium">{asset.quantity}</td>
                      <td className="p-4 text-right text-muted-foreground">
                        {formatCurrency(asset.averagePrice)}
                      </td>
                      <td className="p-4 text-right font-semibold">
                        {formatCurrency(totalPosition)}
                      </td>
                      <td className="p-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <TbDotsVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações do Ativo</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <TbPlus className="h-4 w-4" />
                              Adicionar Aporte
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <TbHistory className="h-4 w-4" />
                              Ver Histórico
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <TbEdit className="h-4 w-4" />
                              Editar Ativo
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
