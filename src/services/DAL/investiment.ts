import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import { CreateInvestimentSchema } from '@/lib/validations/investiment';

export const createInvestiment = async (data: CreateInvestimentSchema) => {
  await prisma.investiment.create({
    data: data,
    select: { name: true },
  });
};
