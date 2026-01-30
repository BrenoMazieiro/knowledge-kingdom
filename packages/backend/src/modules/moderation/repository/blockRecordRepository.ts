import { eq, and, desc } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { blockRecords } from '../../../infra/database/schema/blockRecords';
import type { DrizzleDB } from '../../../infra/database/client';
import type { BlockRecordEntity, IBlockRecordRepository } from './types';

export class BlockRecordRepository implements IBlockRecordRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByEntity = async (entityType: string, entityId: string): Promise<BlockRecordEntity[]> => {
    const rows = await this.db
      .select()
      .from(blockRecords)
      .where(and(eq(blockRecords.entityType, entityType), eq(blockRecords.entityId, entityId)))
      .orderBy(desc(blockRecords.createdAt));
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: {
    entityType: string;
    entityId: string;
    blockedById: string;
    reason: string;
    presetMessage?: string;
  }): Promise<BlockRecordEntity> => {
    const rows = await this.db.insert(blockRecords).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  unblock = async (id: string, unblockedById: string): Promise<BlockRecordEntity> => {
    const rows = await this.db
      .update(blockRecords)
      .set({ unblockedAt: new Date(), unblockedById })
      .where(eq(blockRecords.id, id))
      .returning();
    const row = rows[0];
    if (!row) throw new EntityNotFoundError(EntityName.BLOCK_RECORD, { id });
    return this.toEntity(row);
  };

  private toEntity(row: typeof blockRecords.$inferSelect): BlockRecordEntity {
    return {
      id: row.id,
      entityType: row.entityType,
      entityId: row.entityId,
      blockedById: row.blockedById,
      reason: row.reason,
      presetMessage: row.presetMessage,
      blockedAt: row.blockedAt,
      unblockedAt: row.unblockedAt,
      unblockedById: row.unblockedById,
      createdAt: row.createdAt,
    };
  }
}
