import { Tables } from './tables';

export const ReleaseTables = () => {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
        <tr>
          <th className="px-4 py-3">Tipo / Data</th>
          <th className="px-4 py-3">Descrição</th>
          <th className="px-4 py-3">Categoria</th>
          <th className="px-4 py-3">Recorrência</th>
          <th className="px-4 py-3 text-right">Valor</th>
          <th className="px-4 py-3 text-right">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {/* LINHA 1: Salário Fixo (Automação Mensal) */}
        <Tables />
      </tbody>
    </table>
  );
};
