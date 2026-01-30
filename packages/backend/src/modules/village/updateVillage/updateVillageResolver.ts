import { updateVillageInputSchema } from '@kk/shared/schemas/village';
import type { GraphQLContext } from '../../../context';
import type { IUpdateVillageUseCase } from './updateVillageUseCase';
import type { VillageDTO } from '../types';
import type { VillageEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class UpdateVillageResolver {
  constructor(private readonly updateVillageUseCase: IUpdateVillageUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<VillageDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = updateVillageInputSchema.parse(args.input);
    const { id, version, ...updateData } = input;
    const village = await this.updateVillageUseCase.execute(id, version, updateData);
    return this.mapToDto(village);
  };

  private mapToDto(entity: VillageEntity): VillageDTO {
    return {
      id: entity.id,
      version: entity.version,
      kingdomId: entity.kingdomId,
      name: entity.name,
      description: entity.description,
      iconUrl: entity.iconUrl,
      sortOrder: entity.sortOrder,
      creatorId: entity.creatorId,
      chancellorId: entity.chancellorId,
      managerId: entity.managerId,
      visibility: entity.visibility,
      status: entity.status,
      treasuryBalance: entity.treasuryBalance,
      createdAt: entity.createdAt,
    };
  }
}
