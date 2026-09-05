'use client';

import { TbAlertTriangle, TbRefresh } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const ErrorTable = ({ error }: { error?: string }) => {
  const message = error ?? 'Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.';
  const router = useRouter();

  return (
    <tr className="h-full">
      <td colSpan={6} className="h-full px-4 py-20 text-center align-middle">
        <div className="flex h-full w-full min-h-full flex-col items-center justify-center gap-3">
          {/* Ícone com destaque visual em vermelho */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
            <TbAlertTriangle className="h-6 w-6" />
          </div>

          {/* Textos Informativos */}
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              Ops! Algo deu errado
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-sm">{message}</p>
          </div>

          {/* Botão para recarregar */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.refresh()}
            className="mt-1 gap-2 border-rose-500/30 text-rose-600 hover:bg-rose-500/10 hover:text-rose-600 dark:text-rose-400 cursor-pointer"
          >
            <TbRefresh className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      </td>
    </tr>
  );
};
