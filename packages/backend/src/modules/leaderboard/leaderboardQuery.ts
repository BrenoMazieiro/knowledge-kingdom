import { sql, desc } from 'drizzle-orm';
import { wallets } from '../../infra/database/schema/wallets';
import { houseConquests } from '../../infra/database/schema/houseConquests';
import { playerBadges } from '../../infra/database/schema/playerBadges';
import { users } from '../../infra/database/schema/users';
import type { DrizzleDB } from '../../infra/database/client';
import type { LeaderboardEntryDTO, ILeaderboardQuery } from './types';

export class LeaderboardQuery implements ILeaderboardQuery {
  constructor(private readonly db: DrizzleDB) {}

  execute = async (limit: number): Promise<LeaderboardEntryDTO[]> => {
    const conquestCount = this.db
      .select({
        playerId: houseConquests.playerId,
        count: sql<number>`count(*)::int`.as('conquest_count'),
      })
      .from(houseConquests)
      .groupBy(houseConquests.playerId)
      .as('cc');

    const badgeCount = this.db
      .select({
        playerId: playerBadges.playerId,
        count: sql<number>`count(*)::int`.as('badge_count'),
      })
      .from(playerBadges)
      .groupBy(playerBadges.playerId)
      .as('bc');

    const rows = await this.db
      .select({
        userId: users.id,
        gameName: users.gameName,
        totalQuills: sql<number>`coalesce(${wallets.balance}, 0)`.mapWith(Number),
        conquests: sql<number>`coalesce(${conquestCount.count}, 0)`.mapWith(Number),
        badgesEarned: sql<number>`coalesce(${badgeCount.count}, 0)`.mapWith(Number),
      })
      .from(users)
      .leftJoin(wallets, sql`${wallets.playerId} = ${users.id}`)
      .leftJoin(conquestCount, sql`${conquestCount.playerId} = ${users.id}`)
      .leftJoin(badgeCount, sql`${badgeCount.playerId} = ${users.id}`)
      .where(sql`${users.deletedAt} is null and ${users.isBlocked} = false`)
      .orderBy(desc(sql`coalesce(${wallets.balance}, 0)`))
      .limit(limit);

    return rows.map((row, index) => ({
      userId: row.userId,
      gameName: row.gameName,
      totalQuills: row.totalQuills,
      conquests: row.conquests,
      badgesEarned: row.badgesEarned,
      rank: index + 1,
    }));
  };
}
