import type { HouseEntity, HouseEntityUpdate } from './repository/types';

export type HouseDTO = {
  id: string;
  version: number;
  villageId: string;
  creatorId: string;
  ownerType: string;
  name: string;
  description: string | null;
  iconUrl: string | null;
  isFree: boolean;
  entryPrice: number | null;
  visibility: string;
  status: string;
  sortOrder: number;
  createdAt: Date;
};

export interface ICreateHouseUseCase {
  execute: (
    villageId: string,
    creatorId: string,
    name: string,
    description: string | null,
    iconUrl: string | null,
    isFree: boolean,
    entryPrice: number | null,
    visibility: string,
  ) => Promise<HouseEntity>;
}

export interface IGetHouseUseCase {
  execute: (id: string) => Promise<HouseEntity>;
}

export interface IGetHousesUseCase {
  execute: (villageId: string) => Promise<HouseEntity[]>;
}

export interface IUpdateHouseUseCase {
  execute: (id: string, version: number, data: HouseEntityUpdate) => Promise<HouseEntity>;
}

export interface IDeleteHouseUseCase {
  execute: (id: string, version: number) => Promise<void>;
}
