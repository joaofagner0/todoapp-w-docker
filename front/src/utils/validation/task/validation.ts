import { z } from 'zod';

export const storeSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres.'),
  description: z.string().optional(),
});
