import { getMyConquestsResolver } from './conquestModule';

export const conquestResolvers = {
  Query: {
    myConquests: getMyConquestsResolver.resolve,
  },
};
