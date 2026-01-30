import { leaderboardResolver } from './leaderboardModule';

export const leaderboardResolvers = {
  Query: {
    leaderboard: leaderboardResolver.resolve,
  },
};
