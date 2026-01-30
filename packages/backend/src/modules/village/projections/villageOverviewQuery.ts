import { eq, isNull, inArray, count, and } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { villages } from '../../../infra/database/schema/villages';
import { houses } from '../../../infra/database/schema/houses';
import { questions } from '../../../infra/database/schema/questions';
import { contents } from '../../../infra/database/schema/contents';
import { houseConquests } from '../../../infra/database/schema/houseConquests';
import { playerBadges } from '../../../infra/database/schema/playerBadges';
import type { DrizzleDB } from '../../../infra/database/client';
import type { VillageOverviewDTO } from '../types';

export class VillageOverviewQuery {
  constructor(private readonly db: DrizzleDB) {}

  execute = async (villageId: string, userId: string | null): Promise<VillageOverviewDTO> => {
    const [village] = await this.db
      .select()
      .from(villages)
      .where(eq(villages.id, villageId))
      .limit(1);

    if (!village) {
      throw new EntityNotFoundError(EntityName.VILLAGE, { id: villageId });
    }

    const houseRows = await this.db
      .select({ id: houses.id })
      .from(houses)
      .where(and(eq(houses.villageId, villageId), isNull(houses.deletedAt)));

    const houseIds = houseRows.map((h) => h.id);
    const houseCount = houseIds.length;

    let questionCount = 0;
    let contentCount = 0;
    let conquests = 0;
    let badgesEarned = 0;

    if (houseIds.length > 0) {
      const [questionResult] = await this.db
        .select({ total: count() })
        .from(questions)
        .where(and(inArray(questions.houseId, houseIds), isNull(questions.deletedAt)));

      questionCount = questionResult?.total ?? 0;

      const [contentResult] = await this.db
        .select({ total: count() })
        .from(contents)
        .where(and(inArray(contents.houseId, houseIds), isNull(contents.deletedAt)));

      contentCount = contentResult?.total ?? 0;

      if (userId) {
        const [conquestResult] = await this.db
          .select({ total: count() })
          .from(houseConquests)
          .where(
            and(
              eq(houseConquests.playerId, userId),
              inArray(houseConquests.houseId, houseIds),
            ),
          );

        conquests = conquestResult?.total ?? 0;

        const [badgeResult] = await this.db
          .select({ total: count() })
          .from(playerBadges)
          .where(
            and(
              eq(playerBadges.playerId, userId),
              eq(playerBadges.scopeType, 'VILLAGE'),
              eq(playerBadges.scopeId, villageId),
            ),
          );

        badgesEarned = badgeResult?.total ?? 0;
      }
    }

    return {
      village: {
        id: village.id,
        version: village.version,
        kingdomId: village.kingdomId,
        name: village.name,
        description: village.description,
        iconUrl: village.iconUrl,
        sortOrder: village.sortOrder,
        creatorId: village.creatorId,
        chancellorId: village.chancellorId,
        managerId: village.managerId,
        visibility: village.visibility,
        status: village.status,
        treasuryBalance: village.treasuryBalance,
        createdAt: village.createdAt,
      },
      houseCount,
      questionCount,
      contentCount,
      conquests,
      badgesEarned,
    };
  };
}
