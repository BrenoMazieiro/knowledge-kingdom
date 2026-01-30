import { z } from 'zod';

export const getTransactionsInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

export type GetTransactionsInput = z.infer<typeof getTransactionsInputSchema>;
