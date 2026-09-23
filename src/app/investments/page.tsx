import { InvestimentDialog } from './_components/invetimentDialog';
import { SearchFilters } from './_components/searchFilters';
import { InvestimentTable } from './_components/investimentTable';
import { InvestimentSearchParamsType } from '@/types/investiments';

const Page = async ({ searchParams }: { searchParams: Promise<InvestimentSearchParamsType> }) => {
  const params = await searchParams;

  return (
    <main className="w-full py-6 sm:py-8">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Meus Investimentos
              </h1>
              <p className="text-sm text-muted-foreground">
                Acompanhe o histórico de aportes e ativos cadastrados.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <InvestimentDialog />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 sm:p-2 shadow-sm space-y-4">
            <SearchFilters />

            <InvestimentTable params={params} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
