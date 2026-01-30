import { claimTitleResolver, getMyTitlesResolver, challengeLeaderResolver } from './leadershipModule';

export const leadershipResolvers = {
  Query: {
    myTitles: getMyTitlesResolver.resolve,
  },
  Mutation: {
    claimTitle: claimTitleResolver.resolve,
    challengeLeader: challengeLeaderResolver.resolve,
  },
};
