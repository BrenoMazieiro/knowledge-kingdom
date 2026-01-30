export type HouseGroupDTO = {
  id: string;
  villageId: string;
  name: string;
  description: string | null;
  createdByType: string;
  createdById: string;
  createdAt: Date;
};

export interface ICreateHouseGroupUseCase {
  execute: (
    villageId: string,
    name: string,
    description: string | null,
    createdByType: string,
    createdById: string,
  ) => Promise<import('./repository/types').HouseGroupEntity>;
}

export interface IGetHouseGroupsUseCase {
  execute: (villageId: string) => Promise<import('./repository/types').HouseGroupEntity[]>;
}
