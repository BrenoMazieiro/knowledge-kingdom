import { z } from 'zod';
import { QuestionDifficulty } from '../constants/enums';

const questionOptionSchema = z.object({
  text: z.string().min(1).max(500),
  isCorrect: z.boolean(),
});

export const createQuestionInputSchema = z.object({
  houseId: z.string().uuid(),
  text: z.string().min(5).max(2000),
  difficulty: z.nativeEnum(QuestionDifficulty),
  explanation: z.string().max(2000).nullable().default(null),
  options: z.array(questionOptionSchema).length(4).refine(
    (opts) => opts.filter((o) => o.isCorrect).length === 1,
    { message: 'Exactly one option must be marked as correct' },
  ),
});

export const updateQuestionInputSchema = z.object({
  id: z.string().uuid(),
  version: z.number().int(),
  text: z.string().min(5).max(2000).optional(),
  difficulty: z.nativeEnum(QuestionDifficulty).optional(),
  explanation: z.string().max(2000).nullable().optional(),
  options: z.array(questionOptionSchema).length(4).refine(
    (opts) => opts.filter((o) => o.isCorrect).length === 1,
    { message: 'Exactly one option must be marked as correct' },
  ).optional(),
});

export type CreateQuestionInput = z.infer<typeof createQuestionInputSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionInputSchema>;
