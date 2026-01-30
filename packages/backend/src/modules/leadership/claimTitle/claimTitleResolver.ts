import type { GraphQLContext } from '../../../context';
import type { IClaimTitleUseCase, LeadershipTitleDTO } from '../types';
import type { LeadershipTitleEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class ClaimTitleResolver {
  constructor(private readonly claimTitleUseCase: IClaimTitleUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { entityType: string; entityId: string },
    context: GraphQLContext,
  ): Promise<LeadershipTitleDTO> => {
    const userId = requirePlayerNotBlocked(context);
    const title = await this.claimTitleUseCase.execute(userId, args.entityType, args.entityId);
    return this.mapToDto(title);
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
