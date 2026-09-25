'use client';

import { useState, useEffect } from 'react';
import { TbFilter } from 'react-icons/tb';
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { graphicsDataAction } from '../actions';
import { graphicColors, categoryLabels } from '@/constants/overview';
import { GraphicsData } from '@/types/overview';
import { ResponseActionType } from '@/types/response';
import { CardErrorState } from './cardError';

const investmentChartConfig = {
  amount: { label: 'Valor (R$)' },
} satisfies ChartConfig;

const cashFlowChartConfig = {
  income: {
    label: 'Entradas',
    color: graphicColors.income,
  },
  expense: {
    label: 'Saídas',
    color: graphicColors.expense,
  },
} satisfies ChartConfig;

// Mapeamento de cores para a rosca de investimentos (para quando não vier 'fill' do backend)
const categoryColors = [
  graphicColors.blue,
  graphicColors.income,
  graphicColors.amber,
  graphicColors.violet,
];

const riskColorsMap: Record<string, string> = {
  'Baixo Risco': graphicColors.income,
  'Médio Risco': graphicColors.amber,
  'Alto Risco': graphicColors.expense,
};

export const Graphics = () => {
  const [cashFlowFilter, setCashFlowFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [investmentView, setInvestmentView] = useState<'category' | 'risk'>('category');
  const [graphicsData, setGraphicsData] = useState<GraphicsData | null>(null);
  const [responseActionStatus, setResponseActionStatus] = useState<ResponseActionType>({
    success: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await graphicsDataAction();
      setResponseActionStatus({ success: response.success, message: response.message });
      if (response.success && response.data) {
        setGraphicsData(response.data);
      }
      setLoading(false);
    };

    getData();
  }, []);

  // Extrai dados reais com fallback para array vazio
  const cashFlowData = graphicsData?.cashFlow ?? [];
  const rawInvestmentData =
    investmentView === 'category'
      ? (graphicsData?.investimentByCategory ?? [])
      : (graphicsData?.investimentByRisk ?? []);

  // Injeta a cor de preenchimento (fill) dinamicamente em cada item do gráfico de pizza
  const currentInvestmentData = rawInvestmentData.map((item, index) => {
    const displayName =
      investmentView === 'category'
        ? (categoryLabels[item.name as keyof typeof categoryLabels] ?? item.name)
        : item.name;

    return {
      ...item,
      name: displayName, // O Recharts vai usar esse nome traduzido no Tooltip e na Legenda!
      fill:
        investmentView === 'risk'
          ? riskColorsMap[item.name] || categoryColors[index % categoryColors.length]
          : categoryColors[index % categoryColors.length],
    };
  });

  if (loading) return <GraphicLoading />;
  if (!responseActionStatus.success)
    return <CardErrorState message={responseActionStatus.message} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Gráfico 1: Fluxo de Caixa */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-semibold">Fluxo de Caixa</CardTitle>
            <CardDescription className="text-xs">
              Comparativo de receitas e despesas
            </CardDescription>
          </div>

          <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border text-xs">
            <button
              onClick={() => setCashFlowFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                cashFlowFilter === 'all'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setCashFlowFilter('income')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                cashFlowFilter === 'income'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Entradas
            </button>
            <button
              onClick={() => setCashFlowFilter('expense')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                cashFlowFilter === 'expense'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Saídas
            </button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 pt-2">
          <ChartContainer config={cashFlowChartConfig} className="aspect-auto h-[230px] w-full">
            <BarChart data={cashFlowData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />

              {(cashFlowFilter === 'all' || cashFlowFilter === 'income') && (
                <Bar
                  dataKey="income"
                  name="Entradas"
                  fill={graphicColors.income}
                  radius={[4, 4, 0, 0]}
                />
              )}
              {(cashFlowFilter === 'all' || cashFlowFilter === 'expense') && (
                <Bar
                  dataKey="expense"
                  name="Saídas"
                  fill={graphicColors.expense}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico 2: Alocação de Ativos */}
      <Card className="flex flex-col">
        <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base font-semibold">Alocação</CardTitle>
            <CardDescription className="text-xs">Distribuição do patrimônio</CardDescription>
          </div>

          <Select
            value={investmentView}
            onValueChange={(val) => setInvestmentView(val as 'category' | 'risk')}
          >
            <SelectTrigger className="w-[135px] h-7 text-[11px] px-2">
              <TbFilter className="h-3 w-3 mr-1 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Por Categoria</SelectItem>
              <SelectItem value="risk">Por Risco</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="flex-1 p-4 pt-2 flex flex-col justify-between">
          <ChartContainer
            config={investmentChartConfig}
            className="mx-auto aspect-square h-[190px] w-full"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={currentInvestmentData}
                dataKey="amount"
                nameKey="name"
                innerRadius={45}
                outerRadius={70}
                strokeWidth={3}
                paddingAngle={3}
              >
                {currentInvestmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t mt-1">
            {currentInvestmentData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-muted-foreground truncate text-[11px]">
                  {item.name}: <strong className="text-foreground">{item.percent}</strong>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GraphicLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 h-[300px] flex items-center justify-center text-sm text-muted-foreground">
        Carregando fluxo de caixa...
      </Card>
      <Card className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
        Carregando alocação...
      </Card>
    </div>
  );
};
