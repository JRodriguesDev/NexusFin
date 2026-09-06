import { MonthSelector } from './_components/monthSelector';
import { ManageMoney } from './_components/manageMoney';
import { SearchFilters } from './_components/searchFilters';
import { ReleaseTables } from './_components/releaseTables';
import { TransactionSearchParams } from '@/types/transactions';

const Page = async ({ searchParams }: { searchParams: Promise<TransactionSearchParams> }) => {
  const params = await searchParams;

  return (
    <main className="w-full py-6 sm:py-8">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          {/* 1. CABEÇALHO E AÇÕES RÁPIDAS */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Lançamentos & Fluxo de Caixa
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie entradas, saídas e automações mensais de saldo.
              </p>
            </div>

            {/* Grupo de Ações Principais */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Seletor de Mês */}
              <MonthSelector />

              {/* Botão Retirar / Despesa */}
              <ManageMoney />
            </div>
          </div>

          {/* 2. ÁREA DA TABELA E FILTROS */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-2 shadow-sm space-y-4">
            {/* Barra de Busca e Filtros */}
            <SearchFilters />

            {/* Tabela de Lançamentos */}
            <div className="overflow-x-auto">
              <ReleaseTables params={params} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
