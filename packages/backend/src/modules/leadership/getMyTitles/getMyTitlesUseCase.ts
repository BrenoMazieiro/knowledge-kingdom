import type { ILeadershipTitleRepository, LeadershipTitleEntity } from '../repository/types';
import type { IGetMyTitlesUseCase } from '../types';

export class GetMyTitlesUseCase implements IGetMyTitlesUseCase {
  constructor(private readonly leadershipTitleRepository: ILeadershipTitleRepository) {}

  execute = async (playerId: string): Promise<LeadershipTitleEntity[]> => {
    return this.leadershipTitleRepository.findByPlayerId(playerId);
  };
}
