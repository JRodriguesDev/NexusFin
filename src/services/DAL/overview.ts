import 'server-only';
import { prisma } from '@/lib/prisma/prisma';

export const getMoneyKpip = async () => {
  const now = new Date();
  // Datas do Mês Atual (ex: 01/09 até agora)
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Datas do Mês Anterior (ex: 01/08 até 31/08)
  const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const [currentMonthData, previusMonthData, investimentData] = await prisma.$transaction([
    prisma.transaction.groupBy({
      by: ['type'],
      _sum: { amount: true },
      where: { date: { gte: startOfCurrentMonth } },
    }),
    prisma.transaction.groupBy({
      by: ['type'],
      _sum: { amount: true },
      where: { date: { gte: startOfPreviousMonth, lte: endOfPreviousMonth } },
    }),
    prisma.investiment.findMany({
      select: { quantity: true, price: true },
    }),
  ]);

  const totalIncome = Number(
    currentMonthData.find((item) => item.type === 'INCOME')?._sum.amount ?? 0
  );
  const totalExpense = Number(
    currentMonthData.find((item) => item.type === 'EXPENSE')?._sum.amount ?? 0
  );

  const prevIncome = Number(
    previusMonthData.find((item) => item.type === 'INCOME')?._sum.amount ?? 0
  );
  const prevExpense = Number(
    previusMonthData.find((item) => item.type === 'EXPENSE')?._sum.amount ?? 0
  );

  const totalInvested = investimentData.reduce((acc, item) => {
    const qty = Number(item.quantity);
    const price = Number(item.price);
    return acc + qty * price;
  }, 0);

  return {
    totalIncome,
    totalExpense,
    prevIncome,
    prevExpense,
    totalInvested,
  };
};

export const getGraphicData = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [transactions, investiments] = await prisma.$transaction([
    prisma.transaction.findMany({
      where: { date: { gte: sixMonthsAgo } },
      select: {
        amount: true,
        type: true,
        date: true,
      },
      orderBy: { date: 'asc' },
    }),
    prisma.investiment.findMany({
      select: {
        category: true,
        price: true,
        quantity: true,
      },
    }),
  ]);

  const formattedTransactions = transactions.map((tx) => ({
    amount: Number(tx.amount),
    type: tx.type,
    date: tx.date,
  }));

  const formattedInvestiments = investiments.reduce(
    (acc, inv) => {
      const totalValue = Number(inv.price) * Number(inv.quantity);
      const category = inv.category;
      acc[category] = (acc[category] ?? 0) + totalValue;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    formattedTransactions,
    formattedInvestiments,
  };
};
