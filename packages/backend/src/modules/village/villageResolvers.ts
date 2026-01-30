import type { GraphQLContext } from '../../context';
import {
  createVillageResolver,
  getVillageResolver,
  getVillagesResolver,
  updateVillageResolver,
  deleteVillageResolver,
  villageOverviewResolver,
} from './villageModule';
import type { VillageDTO } from './types';

export const villageResolvers = {
  Query: {
    village: getVillageResolver.resolve,
    villages: getVillagesResolver.resolve,
    villageOverview: villageOverviewResolver.resolve,
  },
  Mutation: {
    createVillage: createVillageResolver.resolve,
    updateVillage: updateVillageResolver.resolve,
    deleteVillage: deleteVillageResolver.resolve,
  },
  Village: {
    kingdom: (parent: VillageDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.kingdomById.load(parent.kingdomId),
    houses: (parent: VillageDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.housesByVillageId.load(parent.id),
    creator: (parent: VillageDTO, _args: unknown, context: GraphQLContext) =>
      parent.creatorId ? context.loaders.userById.load(parent.creatorId) : null,
    chancellor: (parent: VillageDTO, _args: unknown, context: GraphQLContext) =>
      parent.chancellorId ? context.loaders.userById.load(parent.chancellorId) : null,
    manager: (parent: VillageDTO, _args: unknown, context: GraphQLContext) =>
      parent.managerId ? context.loaders.userById.load(parent.managerId) : null,
  },
};
