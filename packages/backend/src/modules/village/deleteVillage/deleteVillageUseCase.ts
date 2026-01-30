import type { IVillageRepository } from '../repository/types';

export interface IDeleteVillageUseCase {
  execute: (id: string, version: number) => Promise<void>;
}

export class DeleteVillageUseCase implements IDeleteVillageUseCase {
  constructor(private readonly villageRepository: IVillageRepository) {}

  execute = async (id: string, version: number): Promise<void> => {
    await this.villageRepository.softDelete(id, version);
  };
}
