'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { graphicColors, cashFlowChartConfig } from '@/constants/overview';
import { CashFlowDataItem } from '@/types/overview';

export const CashFlowGraphic = ({ cashFlowData }: { cashFlowData: CashFlowDataItem[] }) => {
  const [cashFlowFilter, setCashFlowFilter] = useState<'all' | 'income' | 'expense'>('all');

  return (
    <Card className="lg:col-span-2 flex flex-col">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle className="text-base font-semibold">Fluxo de Caixa</CardTitle>
          <CardDescription className="text-xs">Comparativo de receitas e despesas</CardDescription>
        </div>

        <div className="flex items-center bg-muted/60 p-0.5 rounded-lg border text-xs">
          <button
            onClick={() => setCashFlowFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
              cashFlowFilter === 'all'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setCashFlowFilter('income')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
              cashFlowFilter === 'income'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Entradas
          </button>
          <button
            onClick={() => setCashFlowFilter('expense')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
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
  );
};
