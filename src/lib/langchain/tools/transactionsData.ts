import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { prisma } from '@/lib/prisma/prisma';

export const getTransactionsTool = tool(
  async ({ type, category, limit }) => {
    try {
      // 1. Montagem do filtro do Prisma baseado nos argumentos recebidos
      const whereClause: Record<string, unknown> = {};

      if (type) {
        whereClause.type = type;
      }

      if (category) {
        whereClause.category = category;
      }

      // 2. Consulta ao banco de dados
      const transactions = await prisma.transaction.findMany({
        where: whereClause,
        take: Math.min(limit || 10, 50),
        orderBy: { date: 'desc' },
        select: {
          id: true,
          type: true,
          amount: true,
          category: true,
          description: true,
          date: true,
        },
      });

      if (transactions.length === 0) {
        return JSON.stringify({
          message: 'Nenhuma transação foi encontrada no banco de dados.',
          data: [],
        });
      }

      // 3. Formatação dos tipos que o JSON.stringify não trata nativamente (Decimal e Date)
      const formattedTransactions = transactions.map((t) => ({
        ...t,
        amount: Number(t.amount), // Converte Decimal do Prisma para Number
        date: t.date.toISOString().split('T')[0], // Converte Date para string "YYYY-MM-DD"
      }));

      return JSON.stringify({
        total: formattedTransactions.length,
        data: formattedTransactions,
      });
    } catch (error) {
      return JSON.stringify({
        error: true,
        message: 'Erro interno ao consultar banco de dados de transações.',
      });
    }
  },
  {
    name: 'get_transactions',
    description:
      'Busca o histórico de transações e gastos do usuário no banco de dados. Permite filtrar por tipo, categoria e limite.',
    schema: z.object({
      type: z
        .enum(['INCOME', 'EXPENSE'])
        .optional()
        .describe('Tipo de transação: INCOME (entradas/receitas) ou EXPENSE (saídas/gastos)'),
      category: z
        .enum([
          'SALARY',
          'FOOD',
          'UTILITIES',
          'ENTERTAINMENT',
          'HEALTH',
          'TRANSPORT',
          'OTHER',
          'OTHER_INCOME',
        ])
        .optional()
        .describe('Categoria exata da transação'),
      limit: z
        .number()
        .optional()
        .default(10)
        .describe('Quantidade máxima de registros a retornar (padrão: 10)'),
    }),
  }
);
