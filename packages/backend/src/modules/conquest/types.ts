import type { HouseConquestEntity } from './repository/types';

export type HouseConquestDTO = {
  id: string;
  playerId: string;
  houseId: string;
  bestTier: string;
  bestScorePercentage: number;
  totalQuillsEarned: number;
  attemptCount: number;
  lastAttemptAt: Date;
  nextRetryAvailableAt: Date | null;
};

export interface IGetMyConquestsUseCase {
  execute: (playerId: string) => Promise<HouseConquestEntity[]>;
}
