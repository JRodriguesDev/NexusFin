import 'server-only';
import { prisma } from '@/lib/prisma/prisma';
import { connection } from 'next/server';

export const getMoneyKpip = async () => {
  await connection();
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
      orderBy: { type: 'asc' },
    }),
    prisma.transaction.groupBy({
      by: ['type'],
      _sum: { amount: true },
      where: { date: { gte: startOfPreviousMonth, lte: endOfPreviousMonth } },
      orderBy: { type: 'asc' },
    }),
    prisma.investiment.findMany({
      select: { quantity: true, price: true },
    }),
  ]);

  const totalIncome = Number(
    currentMonthData.find((item) => item.type === 'INCOME')?._sum?.amount ?? 0
  );
  const totalExpense = Number(
    currentMonthData.find((item) => item.type === 'EXPENSE')?._sum?.amount ?? 0
  );

  const prevIncome = Number(
    previusMonthData.find((item) => item.type === 'INCOME')?._sum?.amount ?? 0
  );
  const prevExpense = Number(
    previusMonthData.find((item) => item.type === 'EXPENSE')?._sum?.amount ?? 0
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
  await connection();
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

export const getSummaryTablesData = async () => {
  await connection();
  const [recentTransactions, investiments] = await prisma.$transaction([
    prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      take: 5,
      select: {
        description: true,
        type: true,
        category: true,
        amount: true,
        date: true,
      },
    }),
    prisma.investiment.findMany({
      select: {
        name: true,
        ticker: true,
        category: true,
        quantity: true,
        price: true,
      },
    }),
  ]);

  let totalInvested = 0;

  const formattedInvestments = investiments.map((inv) => {
    const qty = Number(inv.quantity);
    const price = Number(inv.price);
    const totalValue = qty * price;
    totalInvested += totalValue;

    return {
      name: inv.name,
      ticker: inv.ticker,
      category: inv.category,
      totalValue,
    };
  });

  const topInvestments = formattedInvestments
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 4);

  return {
    recentTransactions: recentTransactions.map((tx) => ({
      ...tx,
      amount: Number(tx.amount),
      date: new Date(tx.date).toLocaleDateString('pt-BR'),
    })),
    topInvestments,
    totalInvested,
  };
};
