import { z } from 'zod';
import { ContentType } from '../constants/enums';

export const createContentInputSchema = z.object({
  houseId: z.string().uuid(),
  title: z.string().min(2).max(200),
  type: z.nativeEnum(ContentType),
  url: z.string().url().nullable().default(null),
  body: z.string().max(50000).nullable().default(null),
  description: z.string().max(1000).default(''),
});

export const updateContentInputSchema = z.object({
  id: z.string().uuid(),
  version: z.number().int(),
  title: z.string().min(2).max(200).optional(),
  type: z.nativeEnum(ContentType).optional(),
  url: z.string().url().nullable().optional(),
  body: z.string().max(50000).nullable().optional(),
  description: z.string().max(1000).optional(),
});

export type CreateContentInput = z.infer<typeof createContentInputSchema>;
export type UpdateContentInput = z.infer<typeof updateContentInputSchema>;
