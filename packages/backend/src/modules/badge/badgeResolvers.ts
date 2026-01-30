import { getMyBadgesResolver } from './badgeModule';

export const badgeResolvers = {
  Query: {
    myBadges: getMyBadgesResolver.resolve,
  },
};
