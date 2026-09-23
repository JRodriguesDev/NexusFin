import { Tables } from './tables';
import { TableSkeleton } from './tableSkeleton';
import { Suspense } from 'react';
import { TransactionSearchParamsType } from '@/types/transactions';

export const ReleaseTables = ({ params }: { params: TransactionSearchParamsType }) => {
  return (
    <div className="w-full rounded-md border border-border h-78 overflow-y-auto">
      <table className="w-full text-left text-sm table-fixed">
        <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm text-xs uppercase text-muted-foreground border-b border-border">
          <tr>
            <th className="w-[18%] px-4 py-3">Tipo / Data</th>
            <th className="w-[30%] px-4 py-3">Descrição</th>
            <th className="w-[18%] px-4 py-3">Categoria</th>
            <th className="w-[14%] px-4 py-3">Recorrência</th>
            <th className="w-[12%] px-4 py-3 text-right">Valor</th>
            <th className="w-[12%] px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          <Suspense fallback={<TableSkeleton />}>
            <Tables params={params} />
          </Suspense>
        </tbody>
      </table>
    </div>
  );
};
