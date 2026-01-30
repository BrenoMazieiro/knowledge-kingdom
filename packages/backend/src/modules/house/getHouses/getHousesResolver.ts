import type { GraphQLContext } from '../../../context';
import type { IGetHousesUseCase, HouseDTO } from '../types';
import type { HouseEntity } from '../repository/types';

export class GetHousesResolver {
  constructor(private readonly getHousesUseCase: IGetHousesUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { villageId: string },
    _context: GraphQLContext,
  ): Promise<HouseDTO[]> => {
    const houses = await this.getHousesUseCase.execute(args.villageId);
    return houses.map((house) => this.mapToDto(house));
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
