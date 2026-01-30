import type { GraphQLContext } from '../../../context';
import type { IGetHouseGroupsUseCase, HouseGroupDTO } from '../types';
import type { HouseGroupEntity } from '../repository/types';
import { requireAuth } from '../../../infra/auth/guards';

export class GetHouseGroupsResolver {
  constructor(private readonly getHouseGroupsUseCase: IGetHouseGroupsUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { villageId: string },
    context: GraphQLContext,
  ): Promise<HouseGroupDTO[]> => {
    requireAuth(context);
    const groups = await this.getHouseGroupsUseCase.execute(args.villageId);
    return groups.map((g) => this.mapToDto(g));
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
