import type { BaseEntity } from '../../../infra/database/types';

export type ContentEntity = BaseEntity & {
  houseId: string;
  creatorId: string;
  title: string;
  type: string;
  url: string | null;
  body: string | null;
  description: string | null;
  sortOrder: number;
};

export type ContentEntityCreate = {
  houseId: string;
  creatorId: string;
  title: string;
  type: string;
  url?: string | null;
  body?: string | null;
  description?: string | null;
  sortOrder?: number;
};

export type ContentEntityUpdate = {
  title?: string;
  type?: string;
  url?: string | null;
  body?: string | null;
  description?: string | null;
  sortOrder?: number;
};

export interface IContentRepository {
  findOneById: (id: string, withDeleted?: boolean) => Promise<ContentEntity>;
  findManyByIds: (ids: readonly string[]) => Promise<ContentEntity[]>;
  findManyByHouseId: (houseId: string, withDeleted?: boolean) => Promise<ContentEntity[]>;
  findManyByHouseIds: (houseIds: readonly string[]) => Promise<ContentEntity[]>;
  create: (data: ContentEntityCreate) => Promise<ContentEntity>;
  update: (id: string, version: number, data: ContentEntityUpdate) => Promise<ContentEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
}
