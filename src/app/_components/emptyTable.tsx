import { TbReceiptOff } from 'react-icons/tb';

export const EmptyTable = () => {
  return (
    <tr className="h-full">
      <td colSpan={6} className="h-full px-4 py-20 text-center align-middle">
        <div className="flex h-full w-full min-h-full flex-col items-center justify-center gap-3">
          {/* Ícone com destaque visual suave */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
            <TbReceiptOff className="h-6 w-6" />
          </div>

          {/* Textos Informativos */}
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              Nenhum lançamento encontrado
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Você ainda não cadastrou nenhuma receita ou despesa.
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
};
