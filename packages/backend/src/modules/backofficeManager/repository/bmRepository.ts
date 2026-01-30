import { eq, and, isNull, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { backofficeManagers } from '../../../infra/database/schema/backofficeManagers';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import type { DrizzleDB } from '../../../infra/database/client';
import type { BMEntity, BMEntityCreate, BMEntityUpdate, IBMRepository } from './types';

export class BMRepository
  extends BaseRepository<typeof backofficeManagers, BMEntity, BMEntityCreate, BMEntityUpdate>
  implements IBMRepository
{
  constructor(db: DrizzleDB) {
    super(db, backofficeManagers, EntityName.BACKOFFICE_MANAGER);
  }

  protected toEntity(row: InferSelectModel<typeof backofficeManagers>): BMEntity {
    return {
      id: row.id,
      version: row.version,
      email: row.email,
      name: row.name,
      passwordHash: row.passwordHash,
      permissionLevel: row.permissionLevel,
      twoFactorEnabled: row.twoFactorEnabled,
      twoFactorSecret: row.twoFactorSecret,
      invitedById: row.invitedById,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findOneByEmail = async (email: string): Promise<BMEntity> => {
    const rows = await this.db
      .select()
      .from(backofficeManagers)
      .where(and(eq(backofficeManagers.email, email), isNull(backofficeManagers.deletedAt)));

    const row = rows[0];
    if (!row) {
      throw new EntityNotFoundError(this.entityName, { email });
    }
    return this.toEntity(row);
  };

  findAll = async (): Promise<BMEntity[]> => {
    const rows = await this.db
      .select()
      .from(backofficeManagers)
      .where(isNull(backofficeManagers.deletedAt));
    return rows.map((row) => this.toEntity(row));
  };
}
