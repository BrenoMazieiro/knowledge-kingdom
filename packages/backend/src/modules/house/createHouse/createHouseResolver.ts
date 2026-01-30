import { createHouseInputSchema } from '@kk/shared/schemas/house';
import type { GraphQLContext } from '../../../context';
import type { ICreateHouseUseCase, HouseDTO } from '../types';
import type { HouseEntity } from '../repository/types';
import { requireBMPermission, requirePlayerNotBlocked } from '../../../infra/auth/guards';
import { BMPermissionLevel } from '@kk/shared/constants/enums';

export class CreateHouseResolver {
  constructor(private readonly createHouseUseCase: ICreateHouseUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: unknown },
    context: GraphQLContext,
  ): Promise<HouseDTO> => {
    const userId = context.bmId
      ? requireBMPermission(context, BMPermissionLevel.EDITOR)
      : requirePlayerNotBlocked(context);
    const input = createHouseInputSchema.parse(args.input);
    const house = await this.createHouseUseCase.execute(
      input.villageId,
      userId,
      input.name,
      input.description || null,
      input.iconUrl,
      input.isFree,
      input.entryPrice ?? null,
      input.visibility,
    );
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
