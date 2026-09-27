import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SummaryTablesLoading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* SKELETON: Últimos Lançamentos */}
      <Card className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3.5 w-48" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>

        {/* Lista de itens */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg border border-border/60"
            >
              <div className="flex items-center gap-2.5">
                {/* Badge Skeleton */}
                <Skeleton className="h-5 w-14 rounded-full" />
                {/* Texto: Título e Categoria */}
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
              </div>
              {/* Valor e Data */}
              <div className="flex flex-col items-end space-y-1.5">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-2.5 w-14" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* SKELETON: Maiores Ativos */}
      <Card className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3.5 w-44" />
          </div>
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>

        {/* Lista de itens */}
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg border border-border/60"
            >
              <div className="flex items-center gap-2.5">
                {/* Avatar / Ticker Circle */}
                <Skeleton className="h-7 w-7 rounded-full" />
                {/* Nome e Ticker */}
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
              {/* Valor Total e Porcentagem */}
              <div className="flex flex-col items-end space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
