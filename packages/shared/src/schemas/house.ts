import { z } from 'zod';

export const createHouseInputSchema = z.object({
  villageId: z.string().uuid(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).default(''),
  iconUrl: z.string().url().nullable().default(null),
  isFree: z.boolean().default(true),
  entryPrice: z.number().int().min(0).nullable().default(null),
  testQuestionCount: z.number().int().min(1).max(50).default(5),
  testEasyCount: z.number().int().min(0).default(2),
  testMediumCount: z.number().int().min(0).default(1),
  testHardCount: z.number().int().min(0).default(2),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
});

export const updateHouseInputSchema = z.object({
  id: z.string().uuid(),
  version: z.number().int(),
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  iconUrl: z.string().url().nullable().optional(),
  isFree: z.boolean().optional(),
  entryPrice: z.number().int().min(0).nullable().optional(),
  testQuestionCount: z.number().int().min(1).max(50).optional(),
  testEasyCount: z.number().int().min(0).optional(),
  testMediumCount: z.number().int().min(0).optional(),
  testHardCount: z.number().int().min(0).optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
});

export type CreateHouseInput = z.infer<typeof createHouseInputSchema>;
export type UpdateHouseInput = z.infer<typeof updateHouseInputSchema>;
