export type LeaderboardEntryDTO = {
  userId: string;
  gameName: string;
  totalQuills: number;
  conquests: number;
  badgesEarned: number;
  rank: number;
};

export interface ILeaderboardQuery {
  execute(limit: number): Promise<LeaderboardEntryDTO[]>;
}
