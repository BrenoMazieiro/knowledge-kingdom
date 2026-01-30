import { eq, and } from 'drizzle-orm';
import { houseGroups } from '../../../infra/database/schema/houseGroups';
import { houseGroupMembers } from '../../../infra/database/schema/houseGroupMembers';
import type { DrizzleDB } from '../../../infra/database/client';
import type { HouseGroupEntity, HouseGroupMemberEntity, IHouseGroupRepository } from './types';

export class HouseGroupRepository implements IHouseGroupRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByVillageId = async (villageId: string): Promise<HouseGroupEntity[]> => {
    const rows = await this.db
      .select()
      .from(houseGroups)
      .where(eq(houseGroups.villageId, villageId));
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: {
    villageId: string;
    name: string;
    description: string | null;
    createdByType: string;
    createdById: string;
  }): Promise<HouseGroupEntity> => {
    const rows = await this.db.insert(houseGroups).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  addHouseToGroup = async (houseGroupId: string, houseId: string): Promise<void> => {
    await this.db.insert(houseGroupMembers).values({ houseGroupId, houseId }).onConflictDoNothing();
  };

  removeHouseFromGroup = async (houseGroupId: string, houseId: string): Promise<void> => {
    await this.db
      .delete(houseGroupMembers)
      .where(and(eq(houseGroupMembers.houseGroupId, houseGroupId), eq(houseGroupMembers.houseId, houseId)));
  };

  getMembersByGroupId = async (houseGroupId: string): Promise<HouseGroupMemberEntity[]> => {
    const rows = await this.db
      .select()
      .from(houseGroupMembers)
      .where(eq(houseGroupMembers.houseGroupId, houseGroupId));
    return rows.map((r) => ({ houseGroupId: r.houseGroupId, houseId: r.houseId, addedAt: r.addedAt }));
  };

  calculateSlots = async (villageId: string): Promise<number> => {
    // Each group counts as 1 slot. Houses not in any group each count as 1 slot.
    const groups = await this.findByVillageId(villageId);
    return groups.length > 0 ? groups.length : 0;
  };

  private toEntity(row: typeof houseGroups.$inferSelect): HouseGroupEntity {
    return {
      id: row.id,
      villageId: row.villageId,
      name: row.name,
      description: row.description,
      createdByType: row.createdByType,
      createdById: row.createdById,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
