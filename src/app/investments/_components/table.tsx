import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { TableActions } from './tableActions';
import { getInvestimentAction } from '../actions';
import { categoryLabels } from '@/constants/investiment';
import { EmptyTable } from '@/app/_components/emptyTable';
import { ErrorTable } from '@/app/_components/errorTable';
import Image from 'next/image';
import { InvestimentSearchParamsType } from '@/types/investiments';

export const Table = async ({ params }: { params: InvestimentSearchParamsType }) => {
  const response = await getInvestimentAction(params);
  if (!response.success) return <ErrorTable error={response.message} />;
  if (response.data?.length === 0) return <EmptyTable />;
  const data = response.data;

  return (
    <>
      {data?.map((investiment) => {
        const totalValue = investiment.quantity * investiment.price;

        return (
          <tr key={investiment.id} className="hover:bg-muted/30 transition-colors">
            {/* Nome do Ativo, Logo e Ticker */}
            <td className="whitespace-nowrap px-4 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                {investiment.logo ? (
                  <Image
                    width={32}
                    height={32}
                    src={investiment.logo}
                    alt={investiment.name}
                    className="h-8 w-8 rounded-full object-cover border shrink-0"
                  />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold uppercase text-muted-foreground border">
                    {investiment.ticker
                      ? investiment.ticker.slice(0, 2)
                      : investiment.name.slice(0, 2)}
                  </div>
                )}
                <div className="">
                  <div className="font-medium leading-tight truncate">{investiment.name}</div>
                  {investiment.ticker && (
                    <span className="text-xs text-muted-foreground inline-block">
                      {investiment.ticker}
                    </span>
                  )}
                </div>
              </div>
            </td>

            {/* Categoria */}
            <td className="px-4 py-3.5">
              <Badge variant="outline" className="font-normal text-xs whitespace-nowrap">
                {categoryLabels[investiment.category]}
              </Badge>
            </td>

            {/* Quantidade */}
            <td className="whitespace-nowrap px-4 py-3.5 text-right font-medium">
              {investiment.quantity}
            </td>

            {/* Preço Unitário */}
            <td className="whitespace-nowrap px-4 py-3.5 text-right text-muted-foreground">
              {formatCurrency(investiment.price)}
            </td>

            {/* Valor Total */}
            <td className="whitespace-nowrap px-4 py-3.5 text-right font-semibold">
              {formatCurrency(totalValue)}
            </td>

            {/* Data da Operação */}
            <td className="whitespace-nowrap px-4 py-3.5 text-right text-xs text-muted-foreground">
              {new Date(investiment.dateOperation).toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              })}
            </td>

            {/* Menu de Ações (agora com a tag TD encapsulando o componente) */}
            <td className="px-4 py-3.5 text-right">
              <TableActions />
            </td>
          </tr>
        );
      })}
    </>
  );
};
