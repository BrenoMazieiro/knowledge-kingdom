import type { IVillageRepository, VillageEntity } from '../repository/types';
import type { IGetVillageUseCase } from '../types';

export class GetVillageUseCase implements IGetVillageUseCase {
  constructor(private readonly villageRepository: IVillageRepository) {}

  execute = async (id: string): Promise<VillageEntity> => {
    return this.villageRepository.findOneById(id);
  };
}
