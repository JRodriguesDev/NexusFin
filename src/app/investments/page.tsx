import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import { InvestimentDialog } from './_components/invetimentDialog';
import { InvestimentStatus } from './_components/investimentStatus';
import { Table } from './_components/table';
import { SearchFilters } from './_components/searchFilters';

const Page = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meus Investimentos</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe o histórico de aportes e ativos cadastrados.
          </p>
        </div>
        <InvestimentDialog />
      </div>

      {/* Cards de Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <InvestimentStatus />
      </div>

      {/* Tabela de Lançamentos com Filtros Estáticos */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Histórico de Operações</CardTitle>
            <CardDescription>
              Lista de todos os aportes e movimentações registradas.
            </CardDescription>
          </div>

          {/* Filtros visuais de busca e categoria */}
          <SearchFilters />
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-left text-muted-foreground">
                  <th className="p-4 font-medium">Ativo</th>
                  <th className="p-4 font-medium">Categoria</th>
                  <th className="p-4 font-medium text-right">Quantidade</th>
                  <th className="p-4 font-medium text-right">Preço Unitário</th>
                  <th className="p-4 font-medium text-right">Valor Total</th>
                  <th className="p-4 font-medium text-right">Data</th>
                  <th className="p-4 font-medium text-center w-16">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <Table />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
