import { eq, and } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { leadershipTitles } from '../../../infra/database/schema/leadershipTitles';
import type { DrizzleDB } from '../../../infra/database/client';
import type { LeadershipTitleEntity, ILeadershipTitleRepository } from './types';

export class LeadershipTitleRepository implements ILeadershipTitleRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByEntity = async (entityType: string, entityId: string): Promise<LeadershipTitleEntity | null> => {
    const rows = await this.db
      .select()
      .from(leadershipTitles)
      .where(and(eq(leadershipTitles.entityType, entityType), eq(leadershipTitles.entityId, entityId)));
    const row = rows[0];
    return row ? this.toEntity(row) : null;
  };

  findByPlayerId = async (playerId: string): Promise<LeadershipTitleEntity[]> => {
    const rows = await this.db
      .select()
      .from(leadershipTitles)
      .where(eq(leadershipTitles.playerId, playerId));
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: {
    entityType: string;
    entityId: string;
    playerId: string;
    title: string;
    acquiredMethod: string;
    gracePeriodUntil?: Date | null;
  }): Promise<LeadershipTitleEntity> => {
    const rows = await this.db.insert(leadershipTitles).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  update = async (id: string, data: {
    playerId?: string;
    acquiredMethod?: string;
    gracePeriodUntil?: Date | null;
  }): Promise<LeadershipTitleEntity> => {
    const rows = await this.db
      .update(leadershipTitles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(leadershipTitles.id, id))
      .returning();
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.LEADERSHIP_TITLE, { id });
    return this.toEntity(row);
  };

  delete = async (id: string): Promise<void> => {
    await this.db.delete(leadershipTitles).where(eq(leadershipTitles.id, id));
  };

  private toEntity(row: typeof leadershipTitles.$inferSelect): LeadershipTitleEntity {
    return {
      id: row.id,
      entityType: row.entityType,
      entityId: row.entityId,
      playerId: row.playerId,
      title: row.title,
      acquiredMethod: row.acquiredMethod,
      gracePeriodUntil: row.gracePeriodUntil,
      acquiredAt: row.acquiredAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
