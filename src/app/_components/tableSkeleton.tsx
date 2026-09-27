import { Skeleton } from '@/components/ui/skeleton';

export const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b transition-colors">
          {/* Coluna 1: Ícone + Data */}
          <td className="whitespace-nowrap px-4 py-3.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </td>

          {/* Coluna 2: Descrição */}
          <td className="px-4 py-3.5">
            <Skeleton className="h-4 w-36" />
          </td>

          {/* Coluna 3: Categoria (Badge) */}
          <td className="px-4 py-3.5">
            <Skeleton className="h-5 w-24 rounded-full" />
          </td>

          {/* Coluna 4: Recorrência */}
          <td className="px-4 py-3.5">
            <Skeleton className="h-4 w-16" />
          </td>

          {/* Coluna 5: Valor (Alinhado à direita) */}
          <td className="px-4 py-3.5 text-right">
            <div className="flex justify-end">
              <Skeleton className="h-4 w-24" />
            </div>
          </td>

          {/* Coluna 6: Ações (Botão/Dropdown) */}
          <td className="px-4 py-3.5 text-right">
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
