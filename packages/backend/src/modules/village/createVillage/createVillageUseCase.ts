import type { IVillageRepository, VillageEntity } from '../repository/types';
import type { ICreateVillageUseCase } from '../types';

export class CreateVillageUseCase implements ICreateVillageUseCase {
  constructor(private readonly villageRepository: IVillageRepository) {}

  execute = async (
    kingdomId: string,
    name: string,
    description: string | null,
    iconUrl: string | null,
  ): Promise<VillageEntity> => {
    return this.villageRepository.create({
      kingdomId,
      name,
      description,
      iconUrl,
    });
  };
}
