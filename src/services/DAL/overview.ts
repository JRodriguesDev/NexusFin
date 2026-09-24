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
