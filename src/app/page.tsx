import { MoneyKpips, MoneyKpisSkeleton } from './_components/moneyKpips';
import { Graphics } from './_components/graphics';
import { SummaryTables } from './_components/summaryTables';
import { Suspense } from 'react';
import { GraphicLoading } from './_components/graphicLoading';
import { SummaryTablesLoading } from './_components/summaryTableSkeleton';

export default function OverviewPage() {
  return (
    <div className="w-full h-screen max-h-screen overflow-y-auto p-4 sm:p-6">
      <div className="flex flex-col gap-4 w-full max-w-[1400px] mx-auto pb-12">
        {/* 1. CABEÇALHO & FILTRO GLOBAL */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Visão Geral
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Acompanhe o balanço das suas finanças e o crescimento dos seus investimentos.
            </p>
          </div>
        </div>

        {/* 2. KPIS COM BORDAS COLORIDAS */}
        <Suspense fallback={<MoneyKpisSkeleton />}>
          <MoneyKpips />
        </Suspense>

        {/* 3. GRÁFICOS */}
        <Suspense fallback={<GraphicLoading />}>
          <Graphics />
        </Suspense>

        {/* 4. TABELAS RESUMIDAS */}
        <Suspense fallback={<SummaryTablesLoading />}>
          <SummaryTables />
        </Suspense>
      </div>
    </div>
  );
}
