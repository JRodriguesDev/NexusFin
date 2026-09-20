import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { CreateInvestimentSchema } from '@/lib/validations/investiment';

export const createInvestiment = async (data: CreateInvestimentSchema) => {
  await prisma.investiment.create({
    data: data,
    select: { name: true },
  });
};

export const getInvestiments = async () => {
  const investiments = await prisma.investiment.findMany({
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
