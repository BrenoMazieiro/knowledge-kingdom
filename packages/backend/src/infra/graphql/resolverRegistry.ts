import type { IResolvers } from '@graphql-tools/utils';
import { authResolvers } from '../../modules/auth/authResolvers';
import { kingdomResolvers } from '../../modules/kingdom/kingdomResolvers';
import { villageResolvers } from '../../modules/village/villageResolvers';
import { houseResolvers } from '../../modules/house/houseResolvers';
import { contentResolvers } from '../../modules/content/contentResolvers';
import { userResolvers } from '../../modules/user/userResolvers';
import { leaderboardResolvers } from '../../modules/leaderboard/leaderboardResolvers';
import { bmResolvers } from '../../modules/backofficeManager/bmResolvers';
import { walletResolvers } from '../../modules/wallet/walletResolvers';
import { questionResolvers } from '../../modules/question/questionResolvers';
import { houseEntryResolvers } from '../../modules/houseEntry/houseEntryResolvers';
import { testResolvers } from '../../modules/test/testResolvers';
import { conquestResolvers } from '../../modules/conquest/conquestResolvers';
import { houseGroupResolvers } from '../../modules/houseGroup/houseGroupResolvers';
import { badgeResolvers } from '../../modules/badge/badgeResolvers';
import { leadershipResolvers } from '../../modules/leadership/leadershipResolvers';
import { accessResolvers } from '../../modules/access/accessResolvers';
import { moderationResolvers } from '../../modules/moderation/moderationResolvers';

export const resolvers: IResolvers[] = [
  authResolvers,
  kingdomResolvers,
  villageResolvers,
  houseResolvers,
  contentResolvers,
  userResolvers,
  leaderboardResolvers,
  bmResolvers,
  walletResolvers,
  questionResolvers,
  houseEntryResolvers,
  testResolvers,
  conquestResolvers,
  houseGroupResolvers,
  badgeResolvers,
  leadershipResolvers,
  accessResolvers,
  moderationResolvers,
];
