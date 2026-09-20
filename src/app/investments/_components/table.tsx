import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { TableActions } from './tableActions';
import { getInvestimentAction } from '../actions';
import { categoryLabels } from '@/constants/investiment';
export const Table = async () => {
  const response = await getInvestimentAction();
  const data = response.data;

  return (
    <>
      {data.map((investiment) => {
        const totalValue = investiment.quantity * investiment.price;

        return (
          <tr key={investiment.id} className="transition-colors hover:bg-muted/50">
            {/* Nome do Ativo, Logo e Ticker */}
            <td className="p-4 font-medium">
              <div className="flex items-center gap-3">
                {investiment.logo ? (
                  <img
                    src={investiment.logo}
                    alt={investiment.name}
                    className="h-8 w-8 rounded-full object-cover border"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold uppercase text-muted-foreground">
                    {investiment.ticker
                      ? investiment.ticker.slice(0, 2)
                      : investiment.name.slice(0, 2)}
                  </div>
                )}
                <div>
                  <div className="font-semibold leading-none">{investiment.name}</div>
                  {investiment.ticker && (
                    <span className="text-xs text-muted-foreground mt-1 inline-block">
                      {investiment.ticker}
                    </span>
                  )}
                </div>
              </div>
            </td>

            {/* Categoria */}
            <td className="p-4">
              <Badge variant="outline" className="font-normal text-xs">
                {categoryLabels[investiment.category]}
              </Badge>
            </td>

            {/* Quantidade */}
            <td className="p-4 text-right font-medium">{investiment.quantity}</td>

            {/* Preço Unitário */}
            <td className="p-4 text-right text-muted-foreground">
              {formatCurrency(investiment.price)}
            </td>

            {/* Valor Total */}
            <td className="p-4 text-right font-semibold">{formatCurrency(totalValue)}</td>

            {/* Data da Operação */}
            <td className="p-4 text-right text-sm text-muted-foreground">
              {new Date(investiment.dateOperation).toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              })}
            </td>

            {/* Menu de Ações */}
            <TableActions />
          </tr>
        );
      })}
    </>
  );
};
