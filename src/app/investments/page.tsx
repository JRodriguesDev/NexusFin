import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InvestimentDialog } from './_components/invetimentDialog';
import { InvestimentStatus } from './_components/investimentStatus';
import { Table } from './_components/table';

export default function InvestmentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meus Investimentos</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe a consolidação dos seus ativos e histórico de aportes.
          </p>
        </div>
        <InvestimentDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Card: Total Alocado */}
        <InvestimentStatus />
      </div>

      {/* Tabela de Inventário Consolidado */}
      <Card>
        <CardHeader>
          <CardTitle>Posições Consolidadas</CardTitle>
          <CardDescription>Resumo dos seus ativos baseado no histórico de aportes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-left text-muted-foreground">
                  <th className="p-4 font-medium">Ativo</th>
                  <th className="p-4 font-medium">Categoria</th>
                  <th className="p-4 font-medium text-right">Quantidade</th>
                  <th className="p-4 font-medium text-right">Preço Médio</th>
                  <th className="p-4 font-medium text-right">Custo Total</th>
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
}
