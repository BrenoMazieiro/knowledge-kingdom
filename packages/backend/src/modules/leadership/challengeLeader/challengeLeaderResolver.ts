import type { GraphQLContext } from '../../../context';
import type { IChallengeLeaderUseCase, DuelChallengeDTO } from '../types';
import type { DuelChallengeEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class ChallengeLeaderResolver {
  constructor(private readonly challengeLeaderUseCase: IChallengeLeaderUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { entityType: string; entityId: string },
    context: GraphQLContext,
  ): Promise<DuelChallengeDTO> => {
    const userId = requirePlayerNotBlocked(context);
    const duel = await this.challengeLeaderUseCase.execute(userId, args.entityType, args.entityId);
    return this.mapToDto(duel);
  };

  private mapToDto(entity: DuelChallengeEntity): DuelChallengeDTO {
    return {
      id: entity.id,
      entityType: entity.entityType,
      entityId: entity.entityId,
      challengerId: entity.challengerId,
      defenderId: entity.defenderId,
      status: entity.status,
      challengerScore: entity.challengerScore,
      defenderScore: entity.defenderScore,
      winnerId: entity.winnerId,
      quillsCost: entity.quillsCost,
      challengedAt: entity.challengedAt,
      respondedAt: entity.respondedAt,
      completedAt: entity.completedAt,
    };
  }
}
