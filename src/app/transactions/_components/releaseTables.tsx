import { Tables } from './tables';
import { TableSkeleton } from './tableSkeleton';
import { Suspense } from 'react';

export const ReleaseTables = () => {
  return (
    // Definimos max-h-[400px] (ou a altura limite que preferir) e overflow-y-auto
    <div className="max-h-[400px] w-full overflow-y-auto overflow-x-auto rounded-md border border-border">
      <table className="w-full text-left text-sm table-fixed">
        {/* sticky top-0 faz o cabeçalho ficar fixo enquanto o tbody rola */}
        <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm text-xs uppercase text-muted-foreground border-b border-border">
          <tr>
            <th className="w-[18%] px-4 py-3">Tipo / Data</th>
            <th className="w-[30%] px-4 py-3">Descrição</th>
            <th className="w-[18%] px-4 py-3">Categoria</th>
            <th className="w-[14%] px-4 py-3">Recorrência</th>
            <th className="w-[12%] px-4 py-3 text-right">Valor</th>
            <th className="w-[8%] px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          <Suspense fallback={<TableSkeleton />}>
            <Tables />
          </Suspense>
        </tbody>
      </table>
    </div>
  );
};
