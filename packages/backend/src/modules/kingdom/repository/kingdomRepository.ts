import { asc, isNull, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { kingdoms } from '../../../infra/database/schema/kingdoms';
import type { DrizzleDB } from '../../../infra/database/client';
import type { KingdomEntity, KingdomEntityCreate, KingdomEntityUpdate, IKingdomRepository } from './types';

export class KingdomRepository
  extends BaseRepository<typeof kingdoms, KingdomEntity, KingdomEntityCreate, KingdomEntityUpdate>
  implements IKingdomRepository
{
  constructor(db: DrizzleDB) {
    super(db, kingdoms, EntityName.KINGDOM);
  }

  protected toEntity(row: InferSelectModel<typeof kingdoms>): KingdomEntity {
    return {
      id: row.id,
      version: row.version,
      name: row.name,
      description: row.description,
      iconUrl: row.iconUrl,
      sortOrder: row.sortOrder,
      creatorId: row.creatorId,
      kingQueenId: row.kingQueenId,
      visibility: row.visibility,
      status: row.status,
      blockReason: row.blockReason,
      treasuryBalance: row.treasuryBalance,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findAll = async (withDeleted = false): Promise<KingdomEntity[]> => {
    const query = this.db.select().from(kingdoms);
    const rows = withDeleted
      ? await query.orderBy(asc(kingdoms.sortOrder))
      : await query.where(isNull(kingdoms.deletedAt)).orderBy(asc(kingdoms.sortOrder));
    return rows.map((row) => this.toEntity(row));
  };
}
