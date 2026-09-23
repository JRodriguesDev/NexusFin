import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { CreateInvestimentSchema, UpdateInvestimentSchema } from '@/lib/validations/investiment';
import { InvestimentSearchParamsType } from '@/types/investiments';
import { cacheTag } from 'next/cache';

export const createInvestiment = async (data: CreateInvestimentSchema) => {
  await prisma.investiment.create({
    data: data,
    select: { name: true },
  });
};

export const getInvestiments = async (filters: InvestimentSearchParamsType) => {
  'use cache';
  cacheTag('investiments');

  const { category, search } = filters;
  const investiments = await prisma.investiment.findMany({
    orderBy: { dateOperation: 'desc' },
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

export const deleteInvestiment = async (id: string) => {
  await prisma.investiment.delete({
    where: { id: id },
  });
};

export const updateInvestiment = async (investiment: UpdateInvestimentSchema) => {
  const { id, ...data } = investiment;
  await prisma.investiment.update({
    where: { id: id },
    data: data,
  });
};
