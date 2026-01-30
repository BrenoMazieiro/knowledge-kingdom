import type { GraphQLContext } from '../../context';
import {
  createKingdomResolver,
  getKingdomResolver,
  getKingdomsResolver,
  updateKingdomResolver,
  deleteKingdomResolver,
  kingdomOverviewResolver,
} from './kingdomModule';
import type { KingdomDTO } from './types';

export const kingdomResolvers = {
  Query: {
    kingdom: getKingdomResolver.resolve,
    kingdoms: getKingdomsResolver.resolve,
    kingdomOverview: kingdomOverviewResolver.resolve,
  },
  Mutation: {
    createKingdom: createKingdomResolver.resolve,
    updateKingdom: updateKingdomResolver.resolve,
    deleteKingdom: deleteKingdomResolver.resolve,
  },
  Kingdom: {
    villages: (parent: KingdomDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.villagesByKingdomId.load(parent.id),
    creator: (parent: KingdomDTO, _args: unknown, context: GraphQLContext) =>
      parent.creatorId ? context.loaders.userById.load(parent.creatorId) : null,
    kingQueen: (parent: KingdomDTO, _args: unknown, context: GraphQLContext) =>
      parent.kingQueenId ? context.loaders.userById.load(parent.kingQueenId) : null,
  },
};
