import { eq, and } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { accessRequests } from '../../../infra/database/schema/accessRequests';
import type { DrizzleDB } from '../../../infra/database/client';
import type { AccessRequestEntity, IAccessRequestRepository } from './types';

export class AccessRequestRepository implements IAccessRequestRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByPlayerAndEntity = async (playerId: string, entityType: string, entityId: string): Promise<AccessRequestEntity | null> => {
    const rows = await this.db
      .select()
      .from(accessRequests)
      .where(
        and(
          eq(accessRequests.playerId, playerId),
          eq(accessRequests.entityType, entityType),
          eq(accessRequests.entityId, entityId),
        ),
      );
    const row = rows[0];
    return row ? this.toEntity(row) : null;
  };

  findByEntity = async (entityType: string, entityId: string, status?: string): Promise<AccessRequestEntity[]> => {
    const conditions = [eq(accessRequests.entityType, entityType), eq(accessRequests.entityId, entityId)];
    if (status) conditions.push(eq(accessRequests.status, status));
    const rows = await this.db
      .select()
      .from(accessRequests)
      .where(and(...conditions));
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: { playerId: string; entityType: string; entityId: string }): Promise<AccessRequestEntity> => {
    const rows = await this.db.insert(accessRequests).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  respond = async (id: string, status: string, respondedById: string, reason?: string): Promise<AccessRequestEntity> => {
    const rows = await this.db
      .update(accessRequests)
      .set({ status, respondedById, responseReason: reason ?? null, respondedAt: new Date() })
      .where(eq(accessRequests.id, id))
      .returning();
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.ACCESS_REQUEST, { id });
    return this.toEntity(row);
  };

  private toEntity(row: typeof accessRequests.$inferSelect): AccessRequestEntity {
    return {
      id: row.id,
      playerId: row.playerId,
      entityType: row.entityType,
      entityId: row.entityId,
      status: row.status,
      responseReason: row.responseReason,
      respondedById: row.respondedById,
      requestedAt: row.requestedAt,
      respondedAt: row.respondedAt,
      createdAt: row.createdAt,
    };
  }
}
