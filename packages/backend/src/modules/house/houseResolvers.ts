import type { GraphQLContext } from '../../context';
import {
  createHouseResolver,
  getHouseResolver,
  getHousesResolver,
  updateHouseResolver,
  deleteHouseResolver,
} from './houseModule';
import type { HouseDTO } from './types';

export const houseResolvers = {
  Query: {
    house: getHouseResolver.resolve,
    houses: getHousesResolver.resolve,
  },
  Mutation: {
    createHouse: createHouseResolver.resolve,
    updateHouse: updateHouseResolver.resolve,
    deleteHouse: deleteHouseResolver.resolve,
  },
  House: {
    village: (parent: HouseDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.villageById.load(parent.villageId),
    creator: (parent: HouseDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.userById.load(parent.creatorId),
    contents: (parent: HouseDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.contentsByHouseId.load(parent.id),
  },
};
