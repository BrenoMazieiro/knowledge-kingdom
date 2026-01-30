import { eq } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { testAnswers } from '../../../infra/database/schema/testAnswers';
import type { DrizzleDB } from '../../../infra/database/client';
import type { TestAnswerEntity, ITestAnswerRepository } from './types';

export class TestAnswerRepository implements ITestAnswerRepository {
  constructor(private readonly db: DrizzleDB) {}

  findOneById = async (id: string): Promise<TestAnswerEntity> => {
    const rows = await this.db.select().from(testAnswers).where(eq(testAnswers.id, id));
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.TEST_ANSWER, { id });
    return this.toEntity(row);
  };

  findByTestSessionId = async (testSessionId: string): Promise<TestAnswerEntity[]> => {
    const rows = await this.db
      .select()
      .from(testAnswers)
      .where(eq(testAnswers.testSessionId, testSessionId));
    return rows.map((r) => this.toEntity(r));
  };

  createMany = async (answers: { testSessionId: string; questionId: string }[]): Promise<TestAnswerEntity[]> => {
    const rows = await this.db.insert(testAnswers).values(answers).returning();
    return rows.map((r) => this.toEntity(r));
  };

  submitAnswer = async (id: string, selectedOptionId: string, isCorrect: boolean): Promise<TestAnswerEntity> => {
    const rows = await this.db
      .update(testAnswers)
      .set({ selectedOptionId, isCorrect, answeredAt: new Date() })
      .where(eq(testAnswers.id, id))
      .returning();
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.TEST_ANSWER, { id });
    return this.toEntity(row);
  };

  private toEntity(row: typeof testAnswers.$inferSelect): TestAnswerEntity {
    return {
      id: row.id,
      testSessionId: row.testSessionId,
      questionId: row.questionId,
      selectedOptionId: row.selectedOptionId,
      isCorrect: row.isCorrect,
      answeredAt: row.answeredAt,
      createdAt: row.createdAt,
    };
  }
}
