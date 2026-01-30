import { eq, and } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { duelChallenges } from '../../../infra/database/schema/duelChallenges';
import type { DrizzleDB } from '../../../infra/database/client';
import type { DuelChallengeEntity, IDuelChallengeRepository } from './types';

export class DuelChallengeRepository implements IDuelChallengeRepository {
  constructor(private readonly db: DrizzleDB) {}

  findOneById = async (id: string): Promise<DuelChallengeEntity> => {
    const rows = await this.db.select().from(duelChallenges).where(eq(duelChallenges.id, id));
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.DUEL_CHALLENGE, { id });
    return this.toEntity(row);
  };

  findByEntityAndStatus = async (entityType: string, entityId: string, status: string): Promise<DuelChallengeEntity[]> => {
    const rows = await this.db
      .select()
      .from(duelChallenges)
      .where(
        and(
          eq(duelChallenges.entityType, entityType),
          eq(duelChallenges.entityId, entityId),
          eq(duelChallenges.status, status),
        ),
      );
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: {
    entityType: string;
    entityId: string;
    challengerId: string;
    defenderId: string;
    status: string;
    quillsCost: number;
    nextChallengeAvailableAt?: Date | null;
  }): Promise<DuelChallengeEntity> => {
    const rows = await this.db.insert(duelChallenges).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  updateStatus = async (id: string, status: string, data?: {
    challengerScore?: number;
    defenderScore?: number;
    winnerId?: string;
    respondedAt?: Date;
    completedAt?: Date;
  }): Promise<DuelChallengeEntity> => {
    const rows = await this.db
      .update(duelChallenges)
      .set({ status, ...data })
      .where(eq(duelChallenges.id, id))
      .returning();
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.DUEL_CHALLENGE, { id });
    return this.toEntity(row);
  };

  private toEntity(row: typeof duelChallenges.$inferSelect): DuelChallengeEntity {
    return {
      id: row.id,
      entityType: row.entityType,
      entityId: row.entityId,
      challengerId: row.challengerId,
      defenderId: row.defenderId,
      status: row.status,
      challengerScore: row.challengerScore,
      defenderScore: row.defenderScore,
      winnerId: row.winnerId,
      quillsCost: row.quillsCost,
      challengedAt: row.challengedAt,
      respondedAt: row.respondedAt,
      completedAt: row.completedAt,
      nextChallengeAvailableAt: row.nextChallengeAvailableAt,
      createdAt: row.createdAt,
    };
  }
}
