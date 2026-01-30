import type { IVillageRepository, VillageEntity } from '../repository/types';
import type { IGetVillagesUseCase } from '../types';

export class GetVillagesUseCase implements IGetVillagesUseCase {
  constructor(private readonly villageRepository: IVillageRepository) {}

  execute = async (kingdomId: string): Promise<VillageEntity[]> => {
    return this.villageRepository.findManyByKingdomId(kingdomId);
  };
}
