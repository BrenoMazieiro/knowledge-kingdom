import { eq, inArray } from 'drizzle-orm';
import { questionOptions } from '../../../infra/database/schema/questionOptions';
import type { DrizzleDB } from '../../../infra/database/client';
import type { QuestionOptionEntity, QuestionOptionCreate, IQuestionOptionRepository } from './types';

export class QuestionOptionRepository implements IQuestionOptionRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByQuestionId = async (questionId: string): Promise<QuestionOptionEntity[]> => {
    const rows = await this.db
      .select()
      .from(questionOptions)
      .where(eq(questionOptions.questionId, questionId));
    return rows.map((row) => this.toEntity(row));
  };

  findByQuestionIds = async (questionIds: readonly string[]): Promise<QuestionOptionEntity[]> => {
    if (questionIds.length === 0) return [];
    const rows = await this.db
      .select()
      .from(questionOptions)
      .where(inArray(questionOptions.questionId, [...questionIds]));
    return rows.map((row) => this.toEntity(row));
  };

  insertMany = async (options: QuestionOptionCreate[]): Promise<QuestionOptionEntity[]> => {
    const rows = await this.db
      .insert(questionOptions)
      .values(options)
      .returning();
    return rows.map((row) => this.toEntity(row));
  };

  deleteByQuestionId = async (questionId: string): Promise<void> => {
    await this.db
      .delete(questionOptions)
      .where(eq(questionOptions.questionId, questionId));
  };

  private toEntity(row: typeof questionOptions.$inferSelect): QuestionOptionEntity {
    return {
      id: row.id,
      questionId: row.questionId,
      text: row.text,
      isCorrect: row.isCorrect,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt,
    };
  }
}
