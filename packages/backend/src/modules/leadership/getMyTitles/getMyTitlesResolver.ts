import type { GraphQLContext } from '../../../context';
import type { IGetMyTitlesUseCase, LeadershipTitleDTO } from '../types';
import type { LeadershipTitleEntity } from '../repository/types';
import { requireAuth } from '../../../infra/auth/guards';

export class GetMyTitlesResolver {
  constructor(private readonly getMyTitlesUseCase: IGetMyTitlesUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<LeadershipTitleDTO[]> => {
    const userId = requireAuth(context);
    const titles = await this.getMyTitlesUseCase.execute(userId);
    return titles.map((t) => this.mapToDto(t));
  };

  private mapToDto(entity: LeadershipTitleEntity): LeadershipTitleDTO {
    return {
      id: entity.id,
      entityType: entity.entityType,
      entityId: entity.entityId,
      playerId: entity.playerId,
      title: entity.title,
      acquiredMethod: entity.acquiredMethod,
      gracePeriodUntil: entity.gracePeriodUntil,
      acquiredAt: entity.acquiredAt,
    };
  }
}
