import { Table } from './table';
import { InvestimentSearchParamsType } from '@/types/investiments';

export const InvestimentTable = ({ params }: { params: InvestimentSearchParamsType }) => {
  return (
    <div className="w-full rounded-md border border-border h-78 overflow-y-auto">
      <table className="w-full text-left text-sm table-fixed">
        <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm text-xs uppercase text-muted-foreground border-b border-border">
          <tr>
            <th className="w-[25%] px-4 py-3">Ativo</th>
            <th className="w-[15%] px-4 py-3">Categoria</th>
            <th className="w-[12%] px-4 py-3 text-right">Quantidade</th>
            <th className="w-[14%] px-4 py-3 text-right">Preço Unitário</th>
            <th className="w-[14%] px-4 py-3 text-right">Valor Total</th>
            <th className="w-[12%] px-4 py-3 text-right">Data</th>
            <th className="w-[8%] px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          <Table params={params} />
        </tbody>
      </table>
    </div>
  );
};
