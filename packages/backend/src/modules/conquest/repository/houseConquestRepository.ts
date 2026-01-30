import { eq, and, inArray } from 'drizzle-orm';
import { houseConquests } from '../../../infra/database/schema/houseConquests';
import type { DrizzleDB } from '../../../infra/database/client';
import type { HouseConquestEntity, IHouseConquestRepository } from './types';

export class HouseConquestRepository implements IHouseConquestRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByPlayerId = async (playerId: string): Promise<HouseConquestEntity[]> => {
    const rows = await this.db
      .select()
      .from(houseConquests)
      .where(eq(houseConquests.playerId, playerId));
    return rows.map((r) => this.toEntity(r));
  };

  findByPlayerAndHouse = async (playerId: string, houseId: string): Promise<HouseConquestEntity | null> => {
    const rows = await this.db
      .select()
      .from(houseConquests)
      .where(and(eq(houseConquests.playerId, playerId), eq(houseConquests.houseId, houseId)));
    const row = rows[0];
    if (!row) return null;
    return this.toEntity(row);
  };

  findByPlayerAndVillageHouses = async (playerId: string, houseIds: string[]): Promise<HouseConquestEntity[]> => {
    if (houseIds.length === 0) return [];
    const rows = await this.db
      .select()
      .from(houseConquests)
      .where(and(eq(houseConquests.playerId, playerId), inArray(houseConquests.houseId, houseIds)));
    return rows.map((r) => this.toEntity(r));
  };

  upsertConquest = async (data: {
    playerId: string;
    houseId: string;
    bestTier: string;
    bestScorePercentage: number;
    totalQuillsEarned: number;
    attemptCount: number;
    lastAttemptAt: Date;
    nextRetryAvailableAt: Date | null;
  }): Promise<HouseConquestEntity> => {
    const rows = await this.db
      .insert(houseConquests)
      .values(data)
      .onConflictDoUpdate({
        target: [houseConquests.playerId, houseConquests.houseId],
        set: {
          bestTier: data.bestTier,
          bestScorePercentage: data.bestScorePercentage,
          totalQuillsEarned: data.totalQuillsEarned,
          attemptCount: data.attemptCount,
          lastAttemptAt: data.lastAttemptAt,
          nextRetryAvailableAt: data.nextRetryAvailableAt,
          updatedAt: new Date(),
        },
      })
      .returning();
    return this.toEntity(rows[0]!);
  };

  private toEntity(row: typeof houseConquests.$inferSelect): HouseConquestEntity {
    return {
      id: row.id,
      playerId: row.playerId,
      houseId: row.houseId,
      bestTier: row.bestTier,
      bestScorePercentage: row.bestScorePercentage,
      totalQuillsEarned: row.totalQuillsEarned,
      attemptCount: row.attemptCount,
      lastAttemptAt: row.lastAttemptAt,
      nextRetryAvailableAt: row.nextRetryAvailableAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
