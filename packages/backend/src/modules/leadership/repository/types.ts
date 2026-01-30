export type LeadershipTitleEntity = {
  id: string;
  entityType: string;
  entityId: string;
  playerId: string;
  title: string;
  acquiredMethod: string;
  gracePeriodUntil: Date | null;
  acquiredAt: Date;
  createdAt: Date;
  updatedAt: Date | null;
};

export type DuelChallengeEntity = {
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
  nextChallengeAvailableAt: Date | null;
  createdAt: Date;
};

export interface ILeadershipTitleRepository {
  findByEntity: (entityType: string, entityId: string) => Promise<LeadershipTitleEntity | null>;
  findByPlayerId: (playerId: string) => Promise<LeadershipTitleEntity[]>;
  create: (data: {
    entityType: string;
    entityId: string;
    playerId: string;
    title: string;
    acquiredMethod: string;
    gracePeriodUntil?: Date | null;
  }) => Promise<LeadershipTitleEntity>;
  update: (id: string, data: {
    playerId?: string;
    acquiredMethod?: string;
    gracePeriodUntil?: Date | null;
  }) => Promise<LeadershipTitleEntity>;
  delete: (id: string) => Promise<void>;
}

export interface IDuelChallengeRepository {
  findOneById: (id: string) => Promise<DuelChallengeEntity>;
  findByEntityAndStatus: (entityType: string, entityId: string, status: string) => Promise<DuelChallengeEntity[]>;
  create: (data: {
    entityType: string;
    entityId: string;
    challengerId: string;
    defenderId: string;
    status: string;
    quillsCost: number;
    nextChallengeAvailableAt?: Date | null;
  }) => Promise<DuelChallengeEntity>;
  updateStatus: (id: string, status: string, data?: {
    challengerScore?: number;
    defenderScore?: number;
    winnerId?: string;
    respondedAt?: Date;
    completedAt?: Date;
  }) => Promise<DuelChallengeEntity>;
}
