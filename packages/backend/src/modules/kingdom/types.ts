export type KingdomDTO = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  iconUrl: string | null;
  sortOrder: number;
  creatorId: string | null;
  kingQueenId: string | null;
  visibility: string;
  status: string;
  treasuryBalance: number;
  createdAt: Date;
};

export type KingdomOverviewDTO = {
  kingdom: KingdomDTO;
  villageCount: number;
  houseCount: number;
  questionCount: number;
  contentCount: number;
};
