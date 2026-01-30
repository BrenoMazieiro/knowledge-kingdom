import { playerBadgeRepository } from './repository/playerBadgeRepositoryModule';
import { GetMyBadgesUseCase } from './getMyBadges/getMyBadgesUseCase';
import { GetMyBadgesResolver } from './getMyBadges/getMyBadgesResolver';

const getMyBadgesUseCase = new GetMyBadgesUseCase(playerBadgeRepository);
export const getMyBadgesResolver = new GetMyBadgesResolver(getMyBadgesUseCase);
