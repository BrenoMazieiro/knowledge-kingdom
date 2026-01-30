import type { GraphQLContext } from '../../../context';
import type { IRequestAccessUseCase, AccessRequestDTO } from '../types';
import type { AccessRequestEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export class RequestAccessResolver {
  constructor(private readonly requestAccessUseCase: IRequestAccessUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { entityType: string; entityId: string },
    context: GraphQLContext,
  ): Promise<AccessRequestDTO> => {
    const userId = requirePlayerNotBlocked(context);
    const request = await this.requestAccessUseCase.execute(userId, args.entityType, args.entityId);
    return this.mapToDto(request);
  };

  private mapToDto(entity: AccessRequestEntity): AccessRequestDTO {
    return {
      id: entity.id,
      playerId: entity.playerId,
      entityType: entity.entityType,
      entityId: entity.entityId,
      status: entity.status,
      responseReason: entity.responseReason,
      respondedById: entity.respondedById,
      requestedAt: entity.requestedAt,
      respondedAt: entity.respondedAt,
    };
  }
}
