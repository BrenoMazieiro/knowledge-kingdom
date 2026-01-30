import { asc, eq, and, isNull, inArray, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { villages } from '../../../infra/database/schema/villages';
import type { DrizzleDB } from '../../../infra/database/client';
import type { VillageEntity, VillageEntityCreate, VillageEntityUpdate, IVillageRepository } from './types';

export class VillageRepository
  extends BaseRepository<typeof villages, VillageEntity, VillageEntityCreate, VillageEntityUpdate>
  implements IVillageRepository
{
  constructor(db: DrizzleDB) {
    super(db, villages, EntityName.VILLAGE);
  }

  protected toEntity(row: InferSelectModel<typeof villages>): VillageEntity {
    return {
      id: row.id,
      version: row.version,
      kingdomId: row.kingdomId,
      name: row.name,
      description: row.description,
      iconUrl: row.iconUrl,
      sortOrder: row.sortOrder,
      creatorId: row.creatorId,
      chancellorId: row.chancellorId,
      managerId: row.managerId,
      visibility: row.visibility,
      status: row.status,
      blockReason: row.blockReason,
      treasuryBalance: Number(row.treasuryBalance),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findManyByKingdomId = async (kingdomId: string, withDeleted = false): Promise<VillageEntity[]> => {
    const conditions = [eq(villages.kingdomId, kingdomId)];
    if (!withDeleted) {
      conditions.push(isNull(villages.deletedAt));
    }

    const rows = await this.db
      .select()
      .from(villages)
      .where(and(...conditions))
      .orderBy(asc(villages.sortOrder));

    return rows.map((row) => this.toEntity(row));
  };

  findManyByKingdomIds = async (kingdomIds: readonly string[]): Promise<VillageEntity[]> => {
    if (kingdomIds.length === 0) return [];

    const rows = await this.db
      .select()
      .from(villages)
      .where(and(inArray(villages.kingdomId, [...kingdomIds]), isNull(villages.deletedAt)))
      .orderBy(asc(villages.sortOrder));

    return rows.map((row) => this.toEntity(row));
  };
}
