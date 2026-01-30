import { BMPermissionLevel } from '@kk/shared/constants/enums';
import type { GraphQLContext } from '../../../context';
import type { ICreateHouseGroupUseCase, HouseGroupDTO } from '../types';
import type { HouseGroupEntity } from '../repository/types';
import { requireBMPermission } from '../../../infra/auth/guards';

export class CreateHouseGroupResolver {
  constructor(private readonly createHouseGroupUseCase: ICreateHouseGroupUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input: { villageId: string; name: string; description?: string } },
    context: GraphQLContext,
  ): Promise<HouseGroupDTO> => {
    const bmId = requireBMPermission(context, BMPermissionLevel.EDITOR);
    const group = await this.createHouseGroupUseCase.execute(
      args.input.villageId,
      args.input.name,
      args.input.description ?? null,
      'BM',
      bmId,
    );
    return this.mapToDto(group);
  };

  private mapToDto(entity: HouseGroupEntity): HouseGroupDTO {
    return {
      id: entity.id,
      villageId: entity.villageId,
      name: entity.name,
      description: entity.description,
      createdByType: entity.createdByType,
      createdById: entity.createdById,
      createdAt: entity.createdAt,
    };
  }
}
