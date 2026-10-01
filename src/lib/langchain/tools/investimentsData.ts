import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { prisma } from '@/lib/prisma/prisma'; // ajuste o caminho do seu prisma client

export const getInvestmentsTool = tool(
  async ({ category, search, limit }) => {
    // 1. Montagem dinâmica do filtro do Prisma
    try {
      const whereClause: Record<string, unknown> = {};

      if (category) {
        whereClause.category = category;
      }

      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { ticker: { contains: search, mode: 'insensitive' } },
        ];
      }

      // 2. Consulta ao banco de dados
      const investments = await prisma.investiment.findMany({
        where: whereClause,
        take: Math.min(limit || 20, 50),
        orderBy: { dateOperation: 'desc' },
        select: {
          id: true,
          name: true,
          ticker: true,
          category: true,
          quantity: true,
          price: true,
          dateOperation: true,
        },
      });

      if (investments.length === 0) {
        return JSON.stringify({
          message: 'Nenhum investimento foi encontrado no banco de dados.',
          data: [],
        });
      }

      // 3. Formatação dos campos Decimal e Date para serialização segura em JSON
      const formattedInvestments = investments.map((inv) => {
        const quantity = Number(inv.quantity);
        const price = Number(inv.price);
        const totalValue = quantity * price;

        return {
          id: inv.id,
          name: inv.name,
          ticker: inv.ticker,
          category: inv.category,
          quantity,
          price,
          totalValue, // Já entrega o valor total calculado (Quantidade * Preço)
          dateOperation: inv.dateOperation.toISOString().split('T')[0],
        };
      });

      return JSON.stringify({
        totalRecords: formattedInvestments.length,
        data: formattedInvestments,
      });
    } catch (error) {
      return JSON.stringify({
        error: true,
        message: 'Erro interno ao consultar banco de dados de investimentos.',
      });
    }
  },
  {
    name: 'get_investments',
    description:
      'Busca a lista de investimentos e ativos do usuário na carteira. Permite filtrar por categoria, nome/ticker e limite.',
    schema: z.object({
      category: z
        .enum(['stock', 'fund', 'bdr', 'fixedIncome'])
        .optional()
        .describe(
          'Categoria do investimento: stock (Ações), fund(Fundos Imobiliários/FIIs), bdr (BDRs) ou fixedIncome (Renda Fixa)'
        ),
      search: z
        .string()
        .optional()
        .describe(
          'Termo para buscar por nome do ativo ou ticker (ex: "PETR4", "Tesouro", "MXRF11")'
        ),
      limit: z
        .number()
        .optional()
        .default(20)
        .describe('Quantidade máxima de registros a retornar (padrão: 20)'),
    }),
  }
);
