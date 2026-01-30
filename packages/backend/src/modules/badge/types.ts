export type PlayerBadgeDTO = {
  id: string;
  playerId: string;
  badgeType: string;
  scopeType: string;
  scopeId: string | null;
  quillsEarned: number;
  earnedAt: Date;
};

export interface IGetMyBadgesUseCase {
  execute: (playerId: string) => Promise<import('./repository/types').PlayerBadgeEntity[]>;
}
