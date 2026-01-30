import type { BaseEntity } from '../../../infra/database/types';

export type VillageEntity = BaseEntity & {
  kingdomId: string;
  name: string;
  description: string | null;
  iconUrl: string | null;
  sortOrder: number;
  creatorId: string | null;
  chancellorId: string | null;
  managerId: string | null;
  visibility: string;
  status: string;
  blockReason: string | null;
  treasuryBalance: number;
};

export type VillageEntityCreate = {
  kingdomId: string;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  sortOrder?: number;
  creatorId?: string | null;
  visibility?: string;
  status?: string;
};

export type VillageEntityUpdate = {
  name?: string;
  description?: string | null;
  iconUrl?: string | null;
  sortOrder?: number;
  chancellorId?: string | null;
  managerId?: string | null;
  visibility?: string;
  status?: string;
  blockReason?: string | null;
};

export interface IVillageRepository {
  findOneById: (id: string, withDeleted?: boolean) => Promise<VillageEntity>;
  findManyByIds: (ids: readonly string[]) => Promise<VillageEntity[]>;
  findManyByKingdomId: (kingdomId: string, withDeleted?: boolean) => Promise<VillageEntity[]>;
  findManyByKingdomIds: (kingdomIds: readonly string[]) => Promise<VillageEntity[]>;
  create: (data: VillageEntityCreate) => Promise<VillageEntity>;
  update: (id: string, version: number, data: VillageEntityUpdate) => Promise<VillageEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
}
