import type { VillageEntity, VillageEntityUpdate } from './repository/types';

export type VillageDTO = {
  id: string;
  version: number;
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
  treasuryBalance: number;
  createdAt: Date;
};

export type VillageOverviewDTO = {
  village: VillageDTO;
  houseCount: number;
  questionCount: number;
  contentCount: number;
  conquests: number;
  badgesEarned: number;
};

export interface ICreateVillageUseCase {
  execute: (
    kingdomId: string,
    name: string,
    description: string | null,
    iconUrl: string | null,
  ) => Promise<VillageEntity>;
}

export interface IGetVillageUseCase {
  execute: (id: string) => Promise<VillageEntity>;
}

export interface IGetVillagesUseCase {
  execute: (kingdomId: string) => Promise<VillageEntity[]>;
}

export interface IUpdateVillageUseCase {
  execute: (id: string, version: number, data: VillageEntityUpdate) => Promise<VillageEntity>;
}

export interface IDeleteVillageUseCase {
  execute: (id: string, version: number) => Promise<void>;
}
