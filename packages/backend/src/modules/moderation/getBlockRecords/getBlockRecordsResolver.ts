import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { IGetBlockRecordsUseCase, BlockRecordDTO } from '../types';
import type { BlockRecordEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class GetBlockRecordsResolver {
  constructor(private readonly getBlockRecordsUseCase: IGetBlockRecordsUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { entityType: string; entityId: string },
    context: GraphQLContext,
  ): Promise<BlockRecordDTO[]> => {
    requireBMPermission(context, BMPermissionLevel.VIEWER);
    const records = await this.getBlockRecordsUseCase.execute(args.entityType, args.entityId);
    return records.map((r) => this.mapToDto(r));
  };

  private mapToDto(entity: BlockRecordEntity): BlockRecordDTO {
    return {
      id: entity.id,
      entityType: entity.entityType,
      entityId: entity.entityId,
      blockedById: entity.blockedById,
      reason: entity.reason,
      presetMessage: entity.presetMessage,
      blockedAt: entity.blockedAt,
      unblockedAt: entity.unblockedAt,
      unblockedById: entity.unblockedById,
    };
  }
}
