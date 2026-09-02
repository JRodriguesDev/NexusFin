import { TbRepeat, TbArrowUpRight, TbArrowDownLeft } from 'react-icons/tb';
import { Badge } from '@/components/ui/badge';
import { TableActions } from './tableActions';

export const Tables = () => {
  return (
    <>
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="whitespace-nowrap px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <TbArrowDownLeft className="h-4 w-4" />
            </div>
            <span className="font-medium text-xs sm:text-sm">05 Set, 2026</span>
          </div>
        </td>
        <td className="px-4 py-3.5 font-medium">Salário Mensal</td>
        <td className="px-4 py-3.5">
          <Badge
            variant="secondary"
            className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
          >
            💰 Renda
          </Badge>
        </td>
        <td className="px-4 py-3.5">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            <TbRepeat className="h-3.5 w-3.5" /> Todo dia 05
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-3.5 text-right font-semibold text-emerald-500">
          + R$ 3.500,00
        </td>
        <td className="px-4 py-3.5 text-right">
          <TableActions />
        </td>
      </tr>

      {/* LINHA 2: Despesa Variável (Mercado) */}
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="whitespace-nowrap px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <TbArrowUpRight className="h-4 w-4" />
            </div>
            <span className="font-medium text-xs sm:text-sm">02 Set, 2026</span>
          </div>
        </td>
        <td className="px-4 py-3.5 font-medium">Supermercados BH</td>
        <td className="px-4 py-3.5">
          <Badge
            variant="secondary"
            className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
          >
            🛒 Alimentação
          </Badge>
        </td>
        <td className="px-4 py-3.5 text-xs text-muted-foreground">Pontual</td>
        <td className="whitespace-nowrap px-4 py-3.5 text-right font-semibold text-red-500">
          - R$ 450,00
        </td>
        <td className="px-4 py-3.5 text-right">
          <TableActions />
        </td>
      </tr>

      {/* LINHA 3: Despesa Recorrente (Conta de Luz) */}
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="whitespace-nowrap px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <TbArrowUpRight className="h-4 w-4" />
            </div>
            <span className="font-medium text-xs sm:text-sm">10 Set, 2026</span>
          </div>
        </td>
        <td className="px-4 py-3.5 font-medium">Conta de Luz (CEMIG)</td>
        <td className="px-4 py-3.5">
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            💡 Contas
          </Badge>
        </td>
        <td className="px-4 py-3.5">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <TbRepeat className="h-3.5 w-3.5" /> Mensal
          </span>
        </td>
        <td className="whitespace-nowrap px-4 py-3.5 text-right font-semibold text-red-500">
          - R$ 180,00
        </td>
        <td className="px-4 py-3.5 text-right">
          <TableActions />
        </td>
      </tr>
    </>
  );
};
