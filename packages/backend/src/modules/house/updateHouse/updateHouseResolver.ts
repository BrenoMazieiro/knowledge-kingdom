import { updateHouseInputSchema } from '@kk/shared/schemas/house';
import type { GraphQLContext } from '../../../context';
import type { IUpdateHouseUseCase } from './updateHouseUseCase';
import type { HouseDTO } from '../types';
import type { HouseEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class UpdateHouseResolver {
  constructor(private readonly updateHouseUseCase: IUpdateHouseUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<HouseDTO> => {
    requireBMPermission(context, BMPermissionLevel.EDITOR);
    const input = updateHouseInputSchema.parse(args.input);
    const { id, version, ...updateData } = input;
    const house = await this.updateHouseUseCase.execute(id, version, updateData);
    return this.mapToDto(house);
  };

  private mapToDto(entity: HouseEntity): HouseDTO {
    return {
      id: entity.id,
      version: entity.version,
      villageId: entity.villageId,
      creatorId: entity.creatorId,
      ownerType: entity.ownerType,
      name: entity.name,
      description: entity.description,
      iconUrl: entity.iconUrl,
      isFree: entity.isFree,
      entryPrice: entity.entryPrice,
      visibility: entity.visibility,
      status: entity.status,
      sortOrder: entity.sortOrder,
      createdAt: entity.createdAt,
    };
  }
}
