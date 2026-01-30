import type { GraphQLContext } from '../../context';
import {
  createContentResolver,
  getContentResolver,
  getContentsResolver,
  updateContentResolver,
  deleteContentResolver,
} from './contentModule';
import type { ContentDTO } from './types';

export const contentResolvers = {
  Query: {
    content: getContentResolver.resolve,
    contents: getContentsResolver.resolve,
  },
  Mutation: {
    createContent: createContentResolver.resolve,
    updateContent: updateContentResolver.resolve,
    deleteContent: deleteContentResolver.resolve,
  },
  Content: {
    house: (parent: ContentDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.houseById.load(parent.houseId),
    creator: (parent: ContentDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.userById.load(parent.creatorId),
  },
};
