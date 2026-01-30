export type HouseGroupEntity = {
  id: string;
  villageId: string;
  name: string;
  description: string | null;
  createdByType: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type HouseGroupMemberEntity = {
  houseGroupId: string;
  houseId: string;
  addedAt: Date;
};

export interface IHouseGroupRepository {
  findByVillageId: (villageId: string) => Promise<HouseGroupEntity[]>;
  create: (data: {
    villageId: string;
    name: string;
    description: string | null;
    createdByType: string;
    createdById: string;
  }) => Promise<HouseGroupEntity>;
  addHouseToGroup: (houseGroupId: string, houseId: string) => Promise<void>;
  removeHouseFromGroup: (houseGroupId: string, houseId: string) => Promise<void>;
  getMembersByGroupId: (houseGroupId: string) => Promise<HouseGroupMemberEntity[]>;
  calculateSlots: (villageId: string) => Promise<number>;
}
