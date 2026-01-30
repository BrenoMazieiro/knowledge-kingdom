import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { IGetAuditLogUseCase, AuditLogDTO } from '../types';
import type { AuditLogEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class GetAuditLogResolver {
  constructor(private readonly getAuditLogUseCase: IGetAuditLogUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { entityType: string; entityId: string },
    context: GraphQLContext,
  ): Promise<AuditLogDTO[]> => {
    requireBMPermission(context, BMPermissionLevel.VIEWER);
    const logs = await this.getAuditLogUseCase.execute(args.entityType, args.entityId);
    return logs.map((l) => this.mapToDto(l));
  };

  private mapToDto(entity: AuditLogEntity): AuditLogDTO {
    return {
      id: entity.id,
      managerId: entity.managerId,
      actionType: entity.actionType,
      entityType: entity.entityType,
      entityId: entity.entityId,
      reason: entity.reason,
      createdAt: entity.createdAt,
    };
  }
}
