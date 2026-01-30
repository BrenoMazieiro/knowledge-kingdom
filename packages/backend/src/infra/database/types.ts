export type BaseEntity = {
  id: string;
  version: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export interface IBaseRepository<TEntity, TCreate, TUpdate> {
  findOneById: (id: string, withDeleted?: boolean) => Promise<TEntity>;
  create: (data: TCreate) => Promise<TEntity>;
  update: (id: string, version: number, data: TUpdate) => Promise<TEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
  restore: (id: string, version: number) => Promise<TEntity>;
  hardDelete: (id: string) => Promise<void>;
}
