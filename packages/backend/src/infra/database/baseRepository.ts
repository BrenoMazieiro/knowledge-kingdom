/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { eq, and, isNull, inArray, sql, type InferSelectModel } from 'drizzle-orm';
import type { PgTable, TableConfig } from 'drizzle-orm/pg-core';
import type { DrizzleDB } from './client';
import type { EntityName } from '@kk/shared/constants/entityName';
import { EntityNotFoundError } from '../errors/entityNotFoundError';
import { EntityVersionMismatchError } from '../errors/entityVersionMismatchError';
import { handleDatabaseError } from './handleDatabaseError';

export type DateFactory = () => Date;

export abstract class BaseRepository<
  TTable extends PgTable<TableConfig>,
  TEntity,
  TCreate,
  TUpdate,
> {
  constructor(
    protected readonly db: DrizzleDB,
    protected readonly table: TTable,
    protected readonly entityName: EntityName,
    protected readonly now: DateFactory = () => this.now(),
  ) {}

  protected abstract toEntity(row: InferSelectModel<TTable>): TEntity;

  findOneById = async (id: string, withDeleted = false): Promise<TEntity> => {
    const tableAny = this.table as any;
    const conditions = [eq(tableAny.id, id)];
    if (!withDeleted && 'deletedAt' in tableAny) {
      conditions.push(isNull(tableAny.deletedAt));
    }

    const rows = await this.db
      .select()
      .from(this.table)
      .where(and(...conditions)) as InferSelectModel<TTable>[];

    const row = rows[0];
    if (!row) {
      throw new EntityNotFoundError(this.entityName, { id });
    }
    return this.toEntity(row);
  };

  findManyByIds = async (ids: readonly string[]): Promise<TEntity[]> => {
    if (ids.length === 0) return [];
    const tableAny = this.table as any;
    const conditions = [inArray(tableAny.id, [...ids])];
    if ('deletedAt' in tableAny) {
      conditions.push(isNull(tableAny.deletedAt));
    }

    const rows = await this.db
      .select()
      .from(this.table)
      .where(and(...conditions)) as InferSelectModel<TTable>[];

    return rows.map((row) => this.toEntity(row));
  };

  create = async (data: TCreate): Promise<TEntity> => {
    try {
      const rows = await this.db
        .insert(this.table)
        .values(data as any)
        .returning() as InferSelectModel<TTable>[];

      return this.toEntity(rows[0]!);
    } catch (error) {
      return handleDatabaseError(error, this.entityName);
    }
  };

  update = async (id: string, version: number, data: TUpdate): Promise<TEntity> => {
    const tableAny = this.table as any;
    try {
      const rows = await this.db
        .update(this.table)
        .set({
          ...(data as any),
          version: sql`${tableAny.version} + 1`,
          updatedAt: this.now(),
        })
        .where(and(eq(tableAny.id, id), eq(tableAny.version, version)))
        .returning() as InferSelectModel<TTable>[];

      const row = rows[0];
      if (!row) {
        throw new EntityVersionMismatchError(this.entityName, { id, version });
      }
      return this.toEntity(row);
    } catch (error) {
      if (error instanceof EntityVersionMismatchError) {
        throw error;
      }
      return handleDatabaseError(error, this.entityName);
    }
  };

  softDelete = async (id: string, version: number): Promise<void> => {
    const tableAny = this.table as any;
    const rows = await this.db
      .update(this.table)
      .set({
        deletedAt: this.now(),
        version: sql`${tableAny.version} + 1`,
        updatedAt: this.now(),
      } as any)
      .where(and(eq(tableAny.id, id), eq(tableAny.version, version)))
      .returning() as unknown[];

    if (rows.length === 0) {
      throw new EntityVersionMismatchError(this.entityName, { id, version });
    }
  };

  hardDelete = async (id: string): Promise<void> => {
    const tableAny = this.table as any;
    await this.db.delete(this.table).where(eq(tableAny.id, id));
  };

  restore = async (id: string, version: number): Promise<TEntity> => {
    const tableAny = this.table as any;
    const rows = await this.db
      .update(this.table)
      .set({
        deletedAt: null,
        version: sql`${tableAny.version} + 1`,
        updatedAt: this.now(),
      } as any)
      .where(and(eq(tableAny.id, id), eq(tableAny.version, version)))
      .returning() as InferSelectModel<TTable>[];

    const row = rows[0];
    if (!row) {
      throw new EntityVersionMismatchError(this.entityName, { id, version });
    }
    return this.toEntity(row);
  };
}
