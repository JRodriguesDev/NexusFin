import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { TableActions } from './tableActions';

const mockInvestments = [
  {
    id: '1',
    name: 'CDB Banco Inter 110% CDI',
    ticker: null,
    logo: null,
    category: 'fixedIncome',
    quantity: 1,
    price: 5000.0,
    dateOperation: '2026-03-15',
  },
  {
    id: '2',
    name: 'Itaú Unibanco',
    ticker: 'ITUB4',
    logo: 'https://github.com/itau.png',
    category: 'stock',
    quantity: 150,
    price: 32.5,
    dateOperation: '2026-02-10',
  },
  {
    id: '3',
    name: 'Maxi Renda FII',
    ticker: 'MXRF11',
    logo: null,
    category: 'fund',
    quantity: 300,
    price: 10.45,
    dateOperation: '2026-01-20',
  },
  {
    id: '4',
    name: 'Apple Inc.',
    ticker: 'AAPL34',
    logo: null,
    category: 'bdr',
    quantity: 20,
    price: 48.9,
    dateOperation: '2026-03-01',
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  stock: 'Ações',
  fund: 'FIIs',
  bdr: 'BDRs',
  fixedIncome: 'Renda Fixa',
};

export const Table = () => {
  return (
    <>
      {mockInvestments.map((asset) => {
        const totalValue = asset.quantity * asset.price;

        return (
          <tr key={asset.id} className="transition-colors hover:bg-muted/50">
            {/* Nome do Ativo, Logo e Ticker */}
            <td className="p-4 font-medium">
              <div className="flex items-center gap-3">
                {asset.logo ? (
                  <img
                    src={asset.logo}
                    alt={asset.name}
                    className="h-8 w-8 rounded-full object-cover border"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold uppercase text-muted-foreground">
                    {asset.ticker ? asset.ticker.slice(0, 2) : asset.name.slice(0, 2)}
                  </div>
                )}
                <div>
                  <div className="font-semibold leading-none">{asset.name}</div>
                  {asset.ticker && (
                    <span className="text-xs text-muted-foreground mt-1 inline-block">
                      {asset.ticker}
                    </span>
                  )}
                </div>
              </div>
            </td>

            {/* Categoria */}
            <td className="p-4">
              <Badge variant="outline" className="font-normal text-xs">
                {CATEGORY_LABELS[asset.category] || asset.category}
              </Badge>
            </td>

            {/* Quantidade */}
            <td className="p-4 text-right font-medium">{asset.quantity}</td>

            {/* Preço Unitário */}
            <td className="p-4 text-right text-muted-foreground">{formatCurrency(asset.price)}</td>

            {/* Valor Total */}
            <td className="p-4 text-right font-semibold">{formatCurrency(totalValue)}</td>

            {/* Data da Operação */}
            <td className="p-4 text-right text-sm text-muted-foreground">
              {new Date(asset.dateOperation).toLocaleDateString('pt-BR', {
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
