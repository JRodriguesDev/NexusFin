import { MonthSelector } from './_components/monthSelector';
import { FixedIncome } from './_components/fixedIncome';
import { ManageMoney } from './_components/manageMoney';
import { SearchFilters } from './_components/searchFilters';
import { ReleaseTables } from './_components/releaseTables';

const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. CABEÇALHO E AÇÕES RÁPIDAS */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lançamentos & Fluxo de Caixa</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie entradas, saídas e automações mensais de saldo.
          </p>
        </div>

        {/* Grupo de Ações Principais */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Seletor de Mês */}
          <MonthSelector />

          {/* Botão de Salário / Renda Fixa */}
          <FixedIncome />

          {/* Botão Retirar / Despesa */}
          <ManageMoney />
        </div>
      </div>

      {/* 2. ÁREA DA TABELA E FILTROS */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Barra de Busca e Filtros */}
        <SearchFilters />

        {/* Tabela de Lançamentos */}
        <div className="overflow-x-auto">
          <ReleaseTables />
        </div>
      </div>
    </div>
  );
};

export default Page;
