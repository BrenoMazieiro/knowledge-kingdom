import { eq, and } from 'drizzle-orm';
import { playerBadges } from '../../../infra/database/schema/playerBadges';
import type { DrizzleDB } from '../../../infra/database/client';
import type { PlayerBadgeEntity, IPlayerBadgeRepository } from './types';

export class PlayerBadgeRepository implements IPlayerBadgeRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByPlayerId = async (playerId: string): Promise<PlayerBadgeEntity[]> => {
    const rows = await this.db
      .select()
      .from(playerBadges)
      .where(eq(playerBadges.playerId, playerId));
    return rows.map((r) => this.toEntity(r));
  };

  findByPlayerAndScope = async (
    playerId: string,
    scopeType: string,
    scopeId: string,
  ): Promise<PlayerBadgeEntity[]> => {
    const rows = await this.db
      .select()
      .from(playerBadges)
      .where(
        and(
          eq(playerBadges.playerId, playerId),
          eq(playerBadges.scopeType, scopeType),
          eq(playerBadges.scopeId, scopeId),
        ),
      );
    return rows.map((r) => this.toEntity(r));
  };

  create = async (data: {
    playerId: string;
    badgeType: string;
    scopeType: string;
    scopeId: string | null;
    quillsEarned: number;
  }): Promise<PlayerBadgeEntity> => {
    const rows = await this.db.insert(playerBadges).values(data).returning();
    return this.toEntity(rows[0]!);
  };

  private toEntity(row: typeof playerBadges.$inferSelect): PlayerBadgeEntity {
    return {
      id: row.id,
      playerId: row.playerId,
      badgeType: row.badgeType,
      scopeType: row.scopeType,
      scopeId: row.scopeId,
      quillsEarned: row.quillsEarned,
      earnedAt: row.earnedAt,
      createdAt: row.createdAt,
    };
  }
}
