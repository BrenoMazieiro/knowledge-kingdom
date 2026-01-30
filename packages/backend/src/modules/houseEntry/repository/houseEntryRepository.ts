import { eq, and } from 'drizzle-orm';
import { houseEntries } from '../../../infra/database/schema/houseEntries';
import type { DrizzleDB } from '../../../infra/database/client';
import type { HouseEntryEntity, IHouseEntryRepository } from './types';

export class HouseEntryRepository implements IHouseEntryRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByPlayerAndHouse = async (playerId: string, houseId: string): Promise<HouseEntryEntity | null> => {
    const rows = await this.db
      .select()
      .from(houseEntries)
      .where(and(eq(houseEntries.playerId, playerId), eq(houseEntries.houseId, houseId)));
    const row = rows[0];
    if (!row) return null;
    return this.toEntity(row);
  };

  create = async (data: { playerId: string; houseId: string; pricePaid: number }): Promise<HouseEntryEntity> => {
    const rows = await this.db.insert(houseEntries).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  private toEntity(row: typeof houseEntries.$inferSelect): HouseEntryEntity {
    return {
      id: row.id,
      playerId: row.playerId,
      houseId: row.houseId,
      pricePaid: row.pricePaid,
      enteredAt: row.enteredAt,
      createdAt: row.createdAt,
    };
  }
}
