import type { GraphQLContext } from '../../../context';
import type { IGetMyConquestsUseCase, HouseConquestDTO } from '../types';
import type { HouseConquestEntity } from '../repository/types';
import { requireAuth } from '../../../infra/auth/guards';

export class GetMyConquestsResolver {
  constructor(private readonly getMyConquestsUseCase: IGetMyConquestsUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<HouseConquestDTO[]> => {
    const userId = requireAuth(context);
    const conquests = await this.getMyConquestsUseCase.execute(userId);
    return conquests.map((c) => this.mapToDto(c));
  };

  private mapToDto(entity: HouseConquestEntity): HouseConquestDTO {
    return {
      id: entity.id,
      playerId: entity.playerId,
      houseId: entity.houseId,
      bestTier: entity.bestTier,
      bestScorePercentage: entity.bestScorePercentage,
      totalQuillsEarned: entity.totalQuillsEarned,
      attemptCount: entity.attemptCount,
      lastAttemptAt: entity.lastAttemptAt,
      nextRetryAvailableAt: entity.nextRetryAvailableAt,
    };
  }
}
