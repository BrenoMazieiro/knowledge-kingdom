import type { IPlayerBadgeRepository, PlayerBadgeEntity } from '../repository/types';
import type { IGetMyBadgesUseCase } from '../types';

export class GetMyBadgesUseCase implements IGetMyBadgesUseCase {
  constructor(private readonly playerBadgeRepository: IPlayerBadgeRepository) {}

  execute = async (playerId: string): Promise<PlayerBadgeEntity[]> => {
    return this.playerBadgeRepository.findByPlayerId(playerId);
  };
}
