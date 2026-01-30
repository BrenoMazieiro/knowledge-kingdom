import type { BaseEntity } from '../../../infra/database/types';

export type HouseEntity = BaseEntity & {
  villageId: string;
  creatorId: string;
  ownerType: string;
  managerId: string | null;
  name: string;
  description: string | null;
  iconUrl: string | null;
  isFree: boolean;
  entryPrice: number | null;
  testQuestionCount: number;
  testEasyCount: number;
  testMediumCount: number;
  testHardCount: number;
  visibility: string;
  status: string;
  blockReason: string | null;
  sortOrder: number;
};

export type HouseEntityCreate = {
  villageId: string;
  creatorId: string;
  ownerType?: string;
  managerId?: string | null;
  name: string;
  description?: string | null;
  iconUrl?: string | null;
  isFree?: boolean;
  entryPrice?: number | null;
  testQuestionCount?: number;
  testEasyCount?: number;
  testMediumCount?: number;
  testHardCount?: number;
  visibility?: string;
  status?: string;
  sortOrder?: number;
};

export type HouseEntityUpdate = {
  name?: string;
  description?: string | null;
  iconUrl?: string | null;
  isFree?: boolean;
  entryPrice?: number | null;
  testQuestionCount?: number;
  testEasyCount?: number;
  testMediumCount?: number;
  testHardCount?: number;
  visibility?: string;
  status?: string;
  blockReason?: string | null;
  managerId?: string | null;
  sortOrder?: number;
};

export interface IHouseRepository {
  findOneById: (id: string, withDeleted?: boolean) => Promise<HouseEntity>;
  findManyByIds: (ids: readonly string[]) => Promise<HouseEntity[]>;
  findManyByVillageId: (villageId: string, withDeleted?: boolean) => Promise<HouseEntity[]>;
  findManyByVillageIds: (villageIds: readonly string[]) => Promise<HouseEntity[]>;
  create: (data: HouseEntityCreate) => Promise<HouseEntity>;
  update: (id: string, version: number, data: HouseEntityUpdate) => Promise<HouseEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
}
