import { eq, and, isNull, asc, type InferSelectModel } from 'drizzle-orm';
import { EntityName } from '@kk/shared/constants/entityName';
import { BaseRepository } from '../../../infra/database/baseRepository';
import { users } from '../../../infra/database/schema/users';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import type { DrizzleDB } from '../../../infra/database/client';
import type { UserEntity, UserEntityCreate, UserEntityUpdate, IUserRepository } from './types';

export class UserRepository
  extends BaseRepository<typeof users, UserEntity, UserEntityCreate, UserEntityUpdate>
  implements IUserRepository
{
  constructor(db: DrizzleDB) {
    super(db, users, EntityName.USER);
  }

  protected toEntity(row: InferSelectModel<typeof users>): UserEntity {
    return {
      id: row.id,
      version: row.version,
      email: row.email,
      name: row.name,
      gameName: row.gameName,
      passwordHash: row.passwordHash,
      emailVerified: row.emailVerified,
      verifyToken: row.verifyToken,
      verifyTokenExpiresAt: row.verifyTokenExpiresAt,
      isBlocked: row.isBlocked,
      blockReason: row.blockReason,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      deletedAt: row.deletedAt,
    };
  }

  findAll = async (withDeleted = false): Promise<UserEntity[]> => {
    const query = this.db.select().from(users);
    const rows = withDeleted
      ? await query.orderBy(asc(users.createdAt))
      : await query.where(isNull(users.deletedAt)).orderBy(asc(users.createdAt));
    return rows.map((row) => this.toEntity(row));
  };

  findOneByEmail = async (email: string, withDeleted = false): Promise<UserEntity> => {
    const conditions = [eq(users.email, email)];
    if (!withDeleted) {
      conditions.push(isNull(users.deletedAt));
    }

    const rows = await this.db
      .select()
      .from(users)
      .where(and(...conditions));

    const row = rows[0];
    if (!row) {
      throw new EntityNotFoundError(this.entityName, { email });
    }
    return this.toEntity(row);
  };

  findOneByGameName = async (gameName: string): Promise<UserEntity> => {
    const rows = await this.db
      .select()
      .from(users)
      .where(and(eq(users.gameName, gameName), isNull(users.deletedAt)));

    const row = rows[0];
    if (!row) {
      throw new EntityNotFoundError(this.entityName, { gameName });
    }
    return this.toEntity(row);
  };

  findOneByVerifyToken = async (token: string): Promise<UserEntity> => {
    const rows = await this.db
      .select()
      .from(users)
      .where(and(eq(users.verifyToken, token), isNull(users.deletedAt)));

    const row = rows[0];
    if (!row) {
      throw new EntityNotFoundError(this.entityName, { verifyToken: token });
    }
    return this.toEntity(row);
  };
}
