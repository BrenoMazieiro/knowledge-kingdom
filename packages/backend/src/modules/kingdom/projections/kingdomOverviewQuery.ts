import { eq, and, isNull, inArray, count } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { kingdoms } from '../../../infra/database/schema/kingdoms';
import { villages } from '../../../infra/database/schema/villages';
import { houses } from '../../../infra/database/schema/houses';
import { questions } from '../../../infra/database/schema/questions';
import { contents } from '../../../infra/database/schema/contents';
import type { DrizzleDB } from '../../../infra/database/client';
import type { KingdomOverviewDTO } from '../types';

export class KingdomOverviewQuery {
  constructor(private readonly db: DrizzleDB) {}

  execute = async (kingdomId: string): Promise<KingdomOverviewDTO> => {
    const [kingdom] = await this.db
      .select()
      .from(kingdoms)
      .where(eq(kingdoms.id, kingdomId))
      .limit(1);

    if (!kingdom) {
      throw new EntityNotFoundError(EntityName.KINGDOM, { id: kingdomId });
    }

    const villageRows = await this.db
      .select({ id: villages.id })
      .from(villages)
      .where(and(eq(villages.kingdomId, kingdomId), isNull(villages.deletedAt)));

    const villageIds = villageRows.map((v) => v.id);
    const villageCount = villageIds.length;

    let houseCount = 0;
    let questionCount = 0;
    let contentCount = 0;

    if (villageIds.length > 0) {
      const houseRows = await this.db
        .select({ id: houses.id })
        .from(houses)
        .where(and(inArray(houses.villageId, villageIds), isNull(houses.deletedAt)));

      const houseIds = houseRows.map((h) => h.id);
      houseCount = houseIds.length;

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
      }
    }

    return {
      kingdom: {
        id: kingdom.id,
        version: kingdom.version,
        name: kingdom.name,
        description: kingdom.description,
        iconUrl: kingdom.iconUrl,
        sortOrder: kingdom.sortOrder,
        creatorId: kingdom.creatorId,
        kingQueenId: kingdom.kingQueenId,
        visibility: kingdom.visibility,
        status: kingdom.status,
        treasuryBalance: kingdom.treasuryBalance,
        createdAt: kingdom.createdAt,
      },
      villageCount,
      houseCount,
      questionCount,
      contentCount,
    };
  };
}
