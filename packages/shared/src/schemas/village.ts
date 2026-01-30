import { z } from 'zod';

export const createVillageInputSchema = z.object({
  kingdomId: z.string().uuid(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).default(''),
  iconUrl: z.string().url().nullable().default(null),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
});

export const updateVillageInputSchema = z.object({
  id: z.string().uuid(),
  version: z.number().int(),
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  iconUrl: z.string().url().nullable().optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
});

export type CreateVillageInput = z.infer<typeof createVillageInputSchema>;
export type UpdateVillageInput = z.infer<typeof updateVillageInputSchema>;
