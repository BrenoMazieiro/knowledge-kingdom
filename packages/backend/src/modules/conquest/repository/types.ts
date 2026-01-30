export type HouseConquestEntity = {
  id: string;
  playerId: string;
  houseId: string;
  bestTier: string;
  bestScorePercentage: number;
  totalQuillsEarned: number;
  attemptCount: number;
  lastAttemptAt: Date;
  nextRetryAvailableAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export interface IHouseConquestRepository {
  findByPlayerId: (playerId: string) => Promise<HouseConquestEntity[]>;
  findByPlayerAndHouse: (playerId: string, houseId: string) => Promise<HouseConquestEntity | null>;
  findByPlayerAndVillageHouses: (playerId: string, houseIds: string[]) => Promise<HouseConquestEntity[]>;
  upsertConquest: (data: {
    playerId: string;
    houseId: string;
    bestTier: string;
    bestScorePercentage: number;
    totalQuillsEarned: number;
    attemptCount: number;
    lastAttemptAt: Date;
    nextRetryAvailableAt: Date | null;
  }) => Promise<HouseConquestEntity>;
}
