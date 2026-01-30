import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { IGetAccessRequestsUseCase, AccessRequestDTO } from '../types';
import type { AccessRequestEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class GetAccessRequestsResolver {
  constructor(private readonly getAccessRequestsUseCase: IGetAccessRequestsUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { entityType: string; entityId: string },
    context: GraphQLContext,
  ): Promise<AccessRequestDTO[]> => {
    requireBMPermission(context, BMPermissionLevel.VIEWER);
    const requests = await this.getAccessRequestsUseCase.execute(args.entityType, args.entityId);
    return requests.map((r) => this.mapToDto(r));
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
