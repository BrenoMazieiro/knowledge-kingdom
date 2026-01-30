import type { BaseEntity } from '../../../infra/database/types';

export type KingdomEntity = BaseEntity & {
  name: string;
  description: string | null;
  iconUrl: string | null;
  sortOrder: number;
  creatorId: string | null;
  kingQueenId: string | null;
  visibility: string;
  status: string;
  blockReason: string | null;
  treasuryBalance: number;
};

export type KingdomEntityCreate = {
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  sortOrder?: number;
  creatorId?: string | null;
  visibility?: string;
  status?: string;
};

export type KingdomEntityUpdate = {
  name?: string;
  description?: string | null;
  iconUrl?: string | null;
  sortOrder?: number;
  kingQueenId?: string | null;
  visibility?: string;
  status?: string;
  blockReason?: string | null;
};

export interface IKingdomRepository {
  findOneById: (id: string, withDeleted?: boolean) => Promise<KingdomEntity>;
  findManyByIds: (ids: readonly string[]) => Promise<KingdomEntity[]>;
  findAll: (withDeleted?: boolean) => Promise<KingdomEntity[]>;
  create: (data: KingdomEntityCreate) => Promise<KingdomEntity>;
  update: (id: string, version: number, data: KingdomEntityUpdate) => Promise<KingdomEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
}
