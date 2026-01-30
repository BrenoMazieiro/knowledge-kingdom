import { asc, eq, and, isNull, inArray, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { houses } from '../../../infra/database/schema/houses';
import type { DrizzleDB } from '../../../infra/database/client';
import type { HouseEntity, HouseEntityCreate, HouseEntityUpdate, IHouseRepository } from './types';

export class HouseRepository
  extends BaseRepository<typeof houses, HouseEntity, HouseEntityCreate, HouseEntityUpdate>
  implements IHouseRepository
{
  constructor(db: DrizzleDB) {
    super(db, houses, EntityName.HOUSE);
  }

  protected toEntity(row: InferSelectModel<typeof houses>): HouseEntity {
    return {
      id: row.id,
      version: row.version,
      villageId: row.villageId,
      creatorId: row.creatorId,
      ownerType: row.ownerType,
      managerId: row.managerId,
      name: row.name,
      description: row.description,
      iconUrl: row.iconUrl,
      isFree: row.isFree,
      entryPrice: row.entryPrice,
      testQuestionCount: row.testQuestionCount,
      testEasyCount: row.testEasyCount,
      testMediumCount: row.testMediumCount,
      testHardCount: row.testHardCount,
      visibility: row.visibility,
      status: row.status,
      blockReason: row.blockReason,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findManyByVillageId = async (villageId: string, withDeleted = false): Promise<HouseEntity[]> => {
    const conditions = [eq(houses.villageId, villageId)];
    if (!withDeleted) {
      conditions.push(isNull(houses.deletedAt));
    }

    const rows = await this.db
      .select()
      .from(houses)
      .where(and(...conditions))
      .orderBy(asc(houses.sortOrder));

    return rows.map((row) => this.toEntity(row));
  };

  findManyByVillageIds = async (villageIds: readonly string[]): Promise<HouseEntity[]> => {
    if (villageIds.length === 0) return [];

    const rows = await this.db
      .select()
      .from(houses)
      .where(and(inArray(houses.villageId, [...villageIds]), isNull(houses.deletedAt)))
      .orderBy(asc(houses.sortOrder));

    return rows.map((row) => this.toEntity(row));
  };
}
