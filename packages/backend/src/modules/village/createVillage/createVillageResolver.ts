import { createVillageInputSchema } from '@kk/shared/schemas/village';
import type { GraphQLContext } from '../../../context';
import type { ICreateVillageUseCase, VillageDTO } from '../types';
import type { VillageEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class CreateVillageResolver {
  constructor(private readonly createVillageUseCase: ICreateVillageUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<VillageDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = createVillageInputSchema.parse(args.input);
    const village = await this.createVillageUseCase.execute(
      input.kingdomId,
      input.name,
      input.description || null,
      input.iconUrl,
    );
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
