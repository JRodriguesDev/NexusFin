'use client';

import { useState } from 'react';
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

const COLORS = {
  income: '#10b981', // Emerald 500
  expense: '#f43f5e', // Rose 500
  blue: '#3b82f6', // Blue 500
  amber: '#f59e0b', // Amber 500
  violet: '#8b5cf6', // Violet 500
};

const investmentChartConfig = {
  amount: { label: 'Valor (R$)' },
} satisfies ChartConfig;

const cashFlowChartConfig = {
  income: {
    label: 'Entradas',
    color: COLORS.income,
  },
  expense: {
    label: 'Saídas',
    color: COLORS.expense,
  },
} satisfies ChartConfig;

const cashFlowData = [
  { month: 'Mai', income: 8200, expense: 4100 },
  { month: 'Jun', income: 9500, expense: 5200 },
  { month: 'Jul', income: 8800, expense: 3900 },
  { month: 'Ago', income: 11000, expense: 6100 },
  { month: 'Set', income: 12450, expense: 4820 },
];

const investmentByCategoryData = [
  { name: 'Ações (B3)', amount: 12400, fill: COLORS.blue, percent: '32%' },
  { name: 'Renda Fixa', amount: 10300, fill: COLORS.income, percent: '27%' },
  { name: 'Fundos Imob.', amount: 9800, fill: COLORS.amber, percent: '25%' },
  { name: 'BDRs / Int.', amount: 6000, fill: COLORS.violet, percent: '16%' },
];

const investmentByRiskData = [
  { name: 'Baixo Risco', amount: 10300, fill: COLORS.income, percent: '27%' },
  { name: 'Médio Risco', amount: 9800, fill: COLORS.amber, percent: '25%' },
  { name: 'Alto Risco', amount: 18400, fill: COLORS.expense, percent: '48%' },
];

export const Graphics = () => {
  const [cashFlowFilter, setCashFlowFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [investmentView, setInvestmentView] = useState<'category' | 'risk'>('category');
  const currentInvestmentData =
    investmentView === 'category' ? investmentByCategoryData : investmentByRiskData;

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
                <Bar dataKey="income" name="Entradas" fill={COLORS.income} radius={[4, 4, 0, 0]} />
              )}
              {(cashFlowFilter === 'all' || cashFlowFilter === 'expense') && (
                <Bar dataKey="expense" name="Saídas" fill={COLORS.expense} radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico 2: Alocação de Ativos (PieChart Corrigido) */}
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
            <SelectTrigger className="w-[120px] h-7 text-[11px] px-2">
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
          {/* h-[190px] fixo evita que a div do gráfico colapse */}
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
