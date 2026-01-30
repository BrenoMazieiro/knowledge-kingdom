import type { IVillageRepository, VillageEntity, VillageEntityUpdate } from '../repository/types';

export interface IUpdateVillageUseCase {
  execute: (id: string, version: number, data: VillageEntityUpdate) => Promise<VillageEntity>;
}

export class UpdateVillageUseCase implements IUpdateVillageUseCase {
  constructor(private readonly villageRepository: IVillageRepository) {}

  execute = async (id: string, version: number, data: VillageEntityUpdate): Promise<VillageEntity> => {
    return this.villageRepository.update(id, version, data);
  };
}
