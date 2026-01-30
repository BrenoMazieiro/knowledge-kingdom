import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import type { IResolvers } from '@graphql-tools/utils';
import { DateTimeResolver } from 'graphql-scalars';

const currentDir = dirname(fileURLToPath(import.meta.url));
const srcDir = join(currentDir, '..', '..');

const loadTypeDef = (relativePath: string): string =>
  readFileSync(join(srcDir, relativePath), 'utf-8');

const typeDefs = mergeTypeDefs([
  loadTypeDef('infra/graphql/common.graphql'),
  loadTypeDef('modules/user/user.graphql'),
  loadTypeDef('modules/auth/auth.graphql'),
  loadTypeDef('modules/kingdom/kingdom.graphql'),
  loadTypeDef('modules/village/village.graphql'),
  loadTypeDef('modules/house/house.graphql'),
  loadTypeDef('modules/content/content.graphql'),
  loadTypeDef('modules/leaderboard/leaderboard.graphql'),
  loadTypeDef('modules/backofficeManager/bm.graphql'),
  loadTypeDef('modules/wallet/wallet.graphql'),
  loadTypeDef('modules/question/question.graphql'),
  loadTypeDef('modules/houseEntry/houseEntry.graphql'),
  loadTypeDef('modules/test/test.graphql'),
  loadTypeDef('modules/conquest/conquest.graphql'),
  loadTypeDef('modules/houseGroup/houseGroup.graphql'),
  loadTypeDef('modules/badge/badge.graphql'),
  loadTypeDef('modules/leadership/leadership.graphql'),
  loadTypeDef('modules/access/access.graphql'),
  loadTypeDef('modules/moderation/moderation.graphql'),
]);

export const createSchema = (resolvers: IResolvers[]) => {
  return makeExecutableSchema({
    typeDefs,
    resolvers: mergeResolvers([{ DateTime: DateTimeResolver }, ...resolvers]),
  });
};
