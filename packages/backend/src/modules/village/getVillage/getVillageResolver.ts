import type { GraphQLContext } from '../../../context';
import type { IGetVillageUseCase, VillageDTO } from '../types';
import type { VillageEntity } from '../repository/types';

export class GetVillageResolver {
  constructor(private readonly getVillageUseCase: IGetVillageUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { id: string },
    _context: GraphQLContext,
  ): Promise<VillageDTO> => {
    const village = await this.getVillageUseCase.execute(args.id);
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
