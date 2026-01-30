import { z } from 'zod';
import { SortOrder } from '../constants/enums';

export const paginationInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.nativeEnum(SortOrder).default(SortOrder.DESC),
});

export type PaginationInput = z.infer<typeof paginationInputSchema>;

export const paginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  });
