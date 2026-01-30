import { eq, and, gte, sql } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { testSessions } from '../../../infra/database/schema/testSessions';
import type { DrizzleDB } from '../../../infra/database/client';
import type { TestSessionEntity, ITestSessionRepository } from './types';

export class TestSessionRepository implements ITestSessionRepository {
  constructor(private readonly db: DrizzleDB) {}

  findOneById = async (id: string): Promise<TestSessionEntity> => {
    const rows = await this.db.select().from(testSessions).where(eq(testSessions.id, id));
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.TEST_SESSION, { id });
    return this.toEntity(row);
  };

  findByPlayerAndHouse = async (playerId: string, houseId: string): Promise<TestSessionEntity[]> => {
    const rows = await this.db
      .select()
      .from(testSessions)
      .where(and(eq(testSessions.playerId, playerId), eq(testSessions.houseId, houseId)));
    return rows.map((r) => this.toEntity(r));
  };

  countByPlayerAndHouse = async (playerId: string, houseId: string): Promise<number> => {
    const rows = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(testSessions)
      .where(and(eq(testSessions.playerId, playerId), eq(testSessions.houseId, houseId)));
    return rows[0]?.count ?? 0;
  };

  hasCompletedToday = async (playerId: string): Promise<boolean> => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const rows = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(testSessions)
      .where(
        and(
          eq(testSessions.playerId, playerId),
          gte(testSessions.startedAt, startOfDay),
        ),
      );
    return (rows[0]?.count ?? 0) > 0;
  };

  create = async (data: {
    playerId: string;
    houseId: string;
    attemptNumber: number;
    questionCount: number;
    isFirstOfDay: boolean;
  }): Promise<TestSessionEntity> => {
    const rows = await this.db.insert(testSessions).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  complete = async (
    id: string,
    correctCount: number,
    scorePercentage: number,
    tierAchieved: string | null,
    quillsEarned: number,
  ): Promise<TestSessionEntity> => {
    const rows = await this.db
      .update(testSessions)
      .set({ correctCount, scorePercentage, tierAchieved, quillsEarned, completedAt: new Date() })
      .where(eq(testSessions.id, id))
      .returning();
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.TEST_SESSION, { id });
    return this.toEntity(row);
  };

  private toEntity(row: typeof testSessions.$inferSelect): TestSessionEntity {
    return {
      id: row.id,
      playerId: row.playerId,
      houseId: row.houseId,
      attemptNumber: row.attemptNumber,
      questionCount: row.questionCount,
      correctCount: row.correctCount,
      scorePercentage: row.scorePercentage,
      tierAchieved: row.tierAchieved,
      quillsEarned: row.quillsEarned,
      isFirstOfDay: row.isFirstOfDay,
      startedAt: row.startedAt,
      completedAt: row.completedAt,
      createdAt: row.createdAt,
    };
  }
}
