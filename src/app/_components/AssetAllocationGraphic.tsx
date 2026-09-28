'use client';

import { useState } from 'react';
import { TbFilter } from 'react-icons/tb';
import { Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { categoryLabels, categoryColors, investmentChartConfig } from '@/constants/overview';
import { GraphicsData } from '@/types/overview';

export const AssetAllocationsGraphic = ({
  graphicsData,
}: {
  graphicsData: Omit<GraphicsData, 'cashFlow'>;
}) => {
  const [investmentView, setInvestmentView] = useState<'category' | 'risk'>('category');

  const rawInvestmentData =
    investmentView === 'category'
      ? (graphicsData?.investimentByCategory ?? [])
      : (graphicsData?.investimentByRisk ?? []);

  // Injeta a cor de preenchimento (fill) dinamicamente em cada item do gráfico de pizza
  const currentInvestmentData = rawInvestmentData.map((item, index) => {
    // 1. Pega o identificador original ("fixedIncome")
    // 2. Busca a tradução ("Renda Fixa")
    const displayName = categoryLabels[item.name as keyof typeof categoryLabels] ?? item.name;

    // 3. Retorna um NOVO objeto mantendo as propriedades do antigo (...item)
    // mas sobrescrevendo 'name' e injetando 'fill'
    return {
      ...item,
      name: displayName,
      fill: categoryColors[index % categoryColors.length],
    };
  });

  return (
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
          <SelectTrigger className="w-[135px] h-7 text-[11px] px-2  cursor-pointer">
            <TbFilter className="h-3 w-3 mr-1 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="category">
              Por Categoria
            </SelectItem>
            <SelectItem className="cursor-pointer" value="risk">
              Por Risco
            </SelectItem>
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
  );
};
