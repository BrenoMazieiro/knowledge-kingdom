import type { LeadershipTitleEntity, DuelChallengeEntity } from './repository/types';

export type LeadershipTitleDTO = {
  id: string;
  entityType: string;
  entityId: string;
  playerId: string;
  title: string;
  acquiredMethod: string;
  gracePeriodUntil: Date | null;
  acquiredAt: Date;
};

export type DuelChallengeDTO = {
  id: string;
  entityType: string;
  entityId: string;
  challengerId: string;
  defenderId: string;
  status: string;
  challengerScore: number | null;
  defenderScore: number | null;
  winnerId: string | null;
  quillsCost: number;
  challengedAt: Date;
  respondedAt: Date | null;
  completedAt: Date | null;
};

export interface IClaimTitleUseCase {
  execute: (playerId: string, entityType: string, entityId: string) => Promise<LeadershipTitleEntity>;
}

export interface IGetMyTitlesUseCase {
  execute: (playerId: string) => Promise<LeadershipTitleEntity[]>;
}

export interface IChallengeLeaderUseCase {
  execute: (challengerId: string, entityType: string, entityId: string) => Promise<DuelChallengeEntity>;
}
