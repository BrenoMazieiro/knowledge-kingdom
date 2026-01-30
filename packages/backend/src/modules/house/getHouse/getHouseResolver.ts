import type { GraphQLContext } from '../../../context';
import type { IGetHouseUseCase, HouseDTO } from '../types';
import type { HouseEntity } from '../repository/types';

export class GetHouseResolver {
  constructor(private readonly getHouseUseCase: IGetHouseUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string },
    _context: GraphQLContext,
  ): Promise<HouseDTO> => {
    const house = await this.getHouseUseCase.execute(args.id);
    return this.mapToDto(house);
  };

  private mapToDto(entity: HouseEntity): HouseDTO {
    return {
      id: entity.id,
      version: entity.version,
      villageId: entity.villageId,
      creatorId: entity.creatorId,
      name: entity.name,
      description: entity.description,
      iconUrl: entity.iconUrl,
      ownerType: entity.ownerType,
      isFree: entity.isFree,
      entryPrice: entity.entryPrice,
      visibility: entity.visibility,
      status: entity.status,
      sortOrder: entity.sortOrder,
      createdAt: entity.createdAt,
    };
  }
}
