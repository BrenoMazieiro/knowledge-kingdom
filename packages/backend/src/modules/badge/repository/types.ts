export type PlayerBadgeEntity = {
  id: string;
  playerId: string;
  badgeType: string;
  scopeType: string;
  scopeId: string | null;
  quillsEarned: number;
  earnedAt: Date;
  createdAt: Date;
};

export interface IPlayerBadgeRepository {
  findByPlayerId: (playerId: string) => Promise<PlayerBadgeEntity[]>;
  findByPlayerAndScope: (playerId: string, scopeType: string, scopeId: string) => Promise<PlayerBadgeEntity[]>;
  create: (data: {
    playerId: string;
    badgeType: string;
    scopeType: string;
    scopeId: string | null;
    quillsEarned: number;
  }) => Promise<PlayerBadgeEntity>;
}
