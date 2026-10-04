import { z } from 'zod';

export const renameSessionSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'Titulo deve ter no mínimo 3 caracteres').max(255, 'Titulo muito longo'),
});

export type RenameSessionSchema = z.infer<typeof renameSessionSchema>;
