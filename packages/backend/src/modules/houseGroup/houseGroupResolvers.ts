import { createHouseGroupResolver, getHouseGroupsResolver } from './houseGroupModule';

export const houseGroupResolvers = {
  Query: {
    houseGroups: getHouseGroupsResolver.resolve,
  },
  Mutation: {
    createHouseGroup: createHouseGroupResolver.resolve,
  },
};
