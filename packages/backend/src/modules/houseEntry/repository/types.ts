export type HouseEntryEntity = {
  id: string;
  playerId: string;
  houseId: string;
  pricePaid: number;
  enteredAt: Date;
  createdAt: Date;
};

export interface IHouseEntryRepository {
  findByPlayerAndHouse: (playerId: string, houseId: string) => Promise<HouseEntryEntity | null>;
  create: (data: { playerId: string; houseId: string; pricePaid: number }) => Promise<HouseEntryEntity>;
}
