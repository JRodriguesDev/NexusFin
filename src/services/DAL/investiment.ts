import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { CreateInvestimentSchema } from '@/lib/validations/investiment';
import { InvestimentSearchParamsType } from '@/types/investiments';

export const createInvestiment = async (data: CreateInvestimentSchema) => {
  await prisma.investiment.create({
    data: data,
    select: { name: true },
  });
};

export const getInvestiments = async (filters: InvestimentSearchParamsType) => {
  const { category, search } = filters;

  const investiments = await prisma.investiment.findMany({
    where: {
      category: category,
      name: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    },
    omit: {
      updatedAt: true,
      createdAt: true,
    },
  });
  return investiments.map((el) => ({
    ...el,
    price: Number(el.price),
    quantity: Number(el.quantity),
  }));
};
