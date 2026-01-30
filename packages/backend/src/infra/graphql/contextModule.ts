import { createContextFactory } from '../../context';
import { createDataLoaders } from './dataloader';
import { sessionRepository } from '../../modules/auth/repository/sessionRepositoryModule';
import { bmSessionRepository } from '../../modules/backofficeManager/repository/bmSessionRepositoryModule';
import { kingdomRepository } from '../../modules/kingdom/repository/kingdomRepositoryModule';
import { villageRepository } from '../../modules/village/repository/villageRepositoryModule';
import { houseRepository } from '../../modules/house/repository/houseRepositoryModule';
import { contentRepository } from '../../modules/content/repository/contentRepositoryModule';
import { userRepository } from '../../modules/user/repository/userRepositoryModule';
import { questionOptionRepository } from '../../modules/question/repository/questionOptionRepositoryModule';

export const contextFactory = createContextFactory({
  sessionRepository,
  bmSessionRepository,
  findUserBlocked: async (userId: string) => {
    try {
      const user = await userRepository.findOneById(userId);
      return user.isBlocked;
    } catch {
      return false;
    }
  },
  createLoaders: () =>
    createDataLoaders({
      kingdomRepository,
      villageRepository,
      houseRepository,
      contentRepository,
      userRepository,
      questionOptionRepository,
    }),
});
