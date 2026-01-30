import { asc, eq, and, isNull, inArray, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { contents } from '../../../infra/database/schema/contents';
import type { DrizzleDB } from '../../../infra/database/client';
import type { ContentEntity, ContentEntityCreate, ContentEntityUpdate, IContentRepository } from './types';

export class ContentRepository
  extends BaseRepository<typeof contents, ContentEntity, ContentEntityCreate, ContentEntityUpdate>
  implements IContentRepository
{
  constructor(db: DrizzleDB) {
    super(db, contents, EntityName.CONTENT);
  }

  protected toEntity(row: InferSelectModel<typeof contents>): ContentEntity {
    return {
      id: row.id,
      version: row.version,
      houseId: row.houseId,
      creatorId: row.creatorId,
      title: row.title,
      type: row.type,
      url: row.url,
      body: row.body,
      description: row.description,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findManyByHouseId = async (houseId: string, withDeleted = false): Promise<ContentEntity[]> => {
    const conditions = [eq(contents.houseId, houseId)];
    if (!withDeleted) {
      conditions.push(isNull(contents.deletedAt));
    }

    const rows = await this.db
      .select()
      .from(contents)
      .where(and(...conditions))
      .orderBy(asc(contents.sortOrder));

    return rows.map((row) => this.toEntity(row));
  };

  findManyByHouseIds = async (houseIds: readonly string[]): Promise<ContentEntity[]> => {
    if (houseIds.length === 0) return [];

    const rows = await this.db
      .select()
      .from(contents)
      .where(and(inArray(contents.houseId, [...houseIds]), isNull(contents.deletedAt)))
      .orderBy(asc(contents.sortOrder));

    return rows.map((row) => this.toEntity(row));
  };
}
