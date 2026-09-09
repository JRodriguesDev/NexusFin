import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TbPlus, TbDotsVertical, TbEdit, TbHistory } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';

const mockInvestments = [
  {
    id: '1',
    name: 'CDB Banco Inter 110% CDI',
    category: 'Renda Fixa',
    quantity: 1,
    averagePrice: 5000.0,
  },
  {
    id: '2',
    name: 'ITUB4 (Itaú Unibanco)',
    category: 'Ações',
    quantity: 150,
    averagePrice: 32.5,
  },
  {
    id: '3',
    name: 'Bitcoin (BTC)',
    category: 'Criptomoedas',
    quantity: 0.05,
    averagePrice: 350000.0,
  },
  {
    id: '4',
    name: 'FII MXRF11',
    category: 'Fundos Imobiliários',
    quantity: 300,
    averagePrice: 10.45,
  },
];

export const Table = () => {
  return (
    <>
      {mockInvestments.map((asset) => {
        const totalPosition = asset.quantity * asset.averagePrice;

        return (
          <tr key={asset.id} className="transition-colors hover:bg-muted/50">
            <td className="p-4 font-medium">{asset.name}</td>
            <td className="p-4">
              <Badge variant="outline" className="font-normal text-xs">
                {asset.category}
              </Badge>
            </td>
            <td className="p-4 text-right font-medium">{asset.quantity}</td>
            <td className="p-4 text-right text-muted-foreground">
              {formatCurrency(asset.averagePrice)}
            </td>
            <td className="p-4 text-right font-semibold">{formatCurrency(totalPosition)}</td>
            <td className="p-4 text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <TbDotsVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações do Ativo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <TbPlus className="h-4 w-4" />
                    Adicionar Aporte
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <TbHistory className="h-4 w-4" />
                    Ver Histórico
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <TbEdit className="h-4 w-4" />
                    Editar Ativo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        );
      })}
    </>
  );
};
