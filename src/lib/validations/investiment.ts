import { z } from 'zod';
import { Prisma, InvestimentCategory } from '@/generated/prisma/client';

export const createInvestimentSchema = z.object({
  category: z.nativeEnum(InvestimentCategory),
  ticker: z
    .string()
    .trim()
    .nullable()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: 'Código do ativo deve ter no mínimo 3 caracteres',
    }),
  logo: z.string().trim().optional(),
  name: z
    .string()
    .trim()
    .min(3, 'Nome do ativo deve ter no mínimo 3 caracteres')
    .max(255, 'Nome do ativo muito longa'),
  quantity: z.coerce
    .number()
    .positive('O valor deve ser maior que zero')
    .transform((value) => new Prisma.Decimal(value)),
  price: z.coerce
    .number()
    .positive('O valor deve ser maior que zero')
    .transform((value) => new Prisma.Decimal(value)),
  dateOperation: z
    .string()
    .min(1, 'Requer Data')
    .transform((date) => new Date(date)),
});

export type CreateInvestimentSchema = z.infer<typeof createInvestimentSchema>;
