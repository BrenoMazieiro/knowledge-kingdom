import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { IRespondToAccessRequestUseCase, AccessRequestDTO } from '../types';
import type { AccessRequestEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class RespondToAccessRequestResolver {
  constructor(private readonly respondToAccessRequestUseCase: IRespondToAccessRequestUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { requestId: string; approved: boolean; reason?: string },
    context: GraphQLContext,
  ): Promise<AccessRequestDTO> => {
    const bmId = requireBMPermission(context, BMPermissionLevel.EDITOR);
    const request = await this.respondToAccessRequestUseCase.execute(bmId, args.requestId, args.approved, args.reason);
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
