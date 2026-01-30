import type { GraphQLContext } from '../../../context';
import type { IGetVillagesUseCase, VillageDTO } from '../types';
import type { VillageEntity } from '../repository/types';

export class GetVillagesResolver {
  constructor(private readonly getVillagesUseCase: IGetVillagesUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { kingdomId: string },
    _context: GraphQLContext,
  ): Promise<VillageDTO[]> => {
    const villages = await this.getVillagesUseCase.execute(args.kingdomId);
    return villages.map((village) => this.mapToDto(village));
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
