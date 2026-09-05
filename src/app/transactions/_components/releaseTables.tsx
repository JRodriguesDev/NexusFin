import { Tables } from './tables';
import { TableSkeleton } from './tableSkeleton';
import { Suspense } from 'react';

export const ReleaseTables = () => {
  return (
    // 1. A div externa segura a altura mínima de 320px (h-80) e o scroll se passar disso
    <div className="min-h-95 w-full overflow-x-auto">
      <table className="w-full text-left text-sm table-fixed">
        <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="w-[18%] px-4 py-3">Tipo / Data</th>
            <th className="w-[30%] px-4 py-3">Descrição</th>
            <th className="w-[18%] px-4 py-3">Categoria</th>
            <th className="w-[14%] px-4 py-3">Recorrência</th>
            <th className="w-[12%] px-4 py-3 text-right">Valor</th>
            <th className="w-[8%] px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>

        {/* 2. Removemos o h-80 daqui. As linhas vão renderizar coladas no topo! */}
        <tbody className="divide-y divide-border">
          <Suspense fallback={<TableSkeleton />}>
            <Tables />
          </Suspense>
        </tbody>
      </table>
    </div>
  );
};
