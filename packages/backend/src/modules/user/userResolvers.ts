import { getUsersResolver } from './userModule';

export const userResolvers = {
  Query: {
    users: getUsersResolver.resolve,
  },
};
