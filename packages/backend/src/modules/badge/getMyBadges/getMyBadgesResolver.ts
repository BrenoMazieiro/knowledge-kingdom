import type { GraphQLContext } from '../../../context';
import type { IGetMyBadgesUseCase, PlayerBadgeDTO } from '../types';
import type { PlayerBadgeEntity } from '../repository/types';
import { requireAuth } from '../../../infra/auth/guards';

export class GetMyBadgesResolver {
  constructor(private readonly getMyBadgesUseCase: IGetMyBadgesUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<PlayerBadgeDTO[]> => {
    const userId = requireAuth(context);
    const badges = await this.getMyBadgesUseCase.execute(userId);
    return badges.map((b) => this.mapToDto(b));
  };

  private mapToDto(entity: PlayerBadgeEntity): PlayerBadgeDTO {
    return {
      id: entity.id,
      playerId: entity.playerId,
      badgeType: entity.badgeType,
      scopeType: entity.scopeType,
      scopeId: entity.scopeId,
      quillsEarned: entity.quillsEarned,
      earnedAt: entity.earnedAt,
    };
  }
}
