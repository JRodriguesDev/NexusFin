import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const GraphicLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* SKELETON: Fluxo de Caixa (2 colunas) */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-2">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3.5 w-48" />
          </div>
          {/* Skeleton dos botões de filtro (Todos / Entradas / Saídas) */}
          <Skeleton className="h-7 w-44 rounded-lg" />
        </CardHeader>

        <CardContent className="flex-1 p-4 pt-4 flex flex-col justify-end">
          {/* Simulação das barras do gráfico de fluxo de caixa */}
          <div className="h-[200px] w-full flex items-end justify-between gap-4 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 flex items-end justify-center gap-1.5 h-full">
                <Skeleton className="w-full h-[60%] rounded-t-sm" />
                <Skeleton className="w-full h-[40%] rounded-t-sm" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SKELETON: Alocação de Ativos (1 coluna) */}
      <Card className="flex flex-col">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-2">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3.5 w-36" />
          </div>
          {/* Skeleton do Select de Filtro */}
          <Skeleton className="h-7 w-28 rounded-md" />
        </CardHeader>

        <CardContent className="flex-1 p-4 pt-2 flex flex-col items-center justify-between">
          {/* Simulação do gráfico de Rosca (Donut) */}
          <div className="relative flex items-center justify-center my-2">
            <Skeleton className="h-[160px] w-[160px] rounded-full" />
            {/* Círculo interno para simular o miolo vazado do Donut Chart */}
            <div className="absolute h-[90px] w-[90px] bg-card rounded-full" />
          </div>

          {/* Simulação da Legenda/Lista na parte inferior */}
          <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t mt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-2.5 w-2.5 rounded-full shrink-0" />
                <Skeleton className="h-3.5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
