import { eq, and, isNull, asc, sql, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { questions } from '../../../infra/database/schema/questions';
import type { DrizzleDB } from '../../../infra/database/client';
import type { QuestionEntity, QuestionEntityCreate, QuestionEntityUpdate, IQuestionRepository } from './types';

export class QuestionRepository
  extends BaseRepository<typeof questions, QuestionEntity, QuestionEntityCreate, QuestionEntityUpdate>
  implements IQuestionRepository
{
  constructor(db: DrizzleDB) {
    super(db, questions, EntityName.QUESTION);
  }

  protected toEntity(row: InferSelectModel<typeof questions>): QuestionEntity {
    return {
      id: row.id,
      version: row.version,
      houseId: row.houseId,
      creatorId: row.creatorId,
      text: row.text,
      difficulty: row.difficulty,
      explanation: row.explanation,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findByHouseId = async (houseId: string): Promise<QuestionEntity[]> => {
    const rows = await this.db
      .select()
      .from(questions)
      .where(and(eq(questions.houseId, houseId), isNull(questions.deletedAt)))
      .orderBy(asc(questions.sortOrder));
    return rows.map((row) => this.toEntity(row));
  };

  findRandomByHouseId = async (
    houseId: string,
    difficulty: string,
    count: number,
  ): Promise<QuestionEntity[]> => {
    const rows = await this.db
      .select()
      .from(questions)
      .where(
        and(
          eq(questions.houseId, houseId),
          eq(questions.difficulty, difficulty),
          isNull(questions.deletedAt),
        ),
      )
      .orderBy(sql`RANDOM()`)
      .limit(count);
    return rows.map((row) => this.toEntity(row));
  };

  countByHouseIdGroupedByDifficulty = async (
    houseId: string,
  ): Promise<Record<string, number>> => {
    const rows = await this.db
      .select({
        difficulty: questions.difficulty,
        count: sql<number>`count(*)::int`,
      })
      .from(questions)
      .where(and(eq(questions.houseId, houseId), isNull(questions.deletedAt)))
      .groupBy(questions.difficulty);

    const result: Record<string, number> = {};
    for (const row of rows) {
      result[row.difficulty] = row.count;
    }
    return result;
  };
}
