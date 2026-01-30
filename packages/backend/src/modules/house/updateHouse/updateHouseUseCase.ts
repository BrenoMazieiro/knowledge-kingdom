import type { IHouseRepository, HouseEntity, HouseEntityUpdate } from '../repository/types';

export interface IUpdateHouseUseCase {
  execute: (id: string, version: number, data: HouseEntityUpdate) => Promise<HouseEntity>;
}

export class UpdateHouseUseCase implements IUpdateHouseUseCase {
  constructor(private readonly houseRepository: IHouseRepository) {}

  execute = async (id: string, version: number, data: HouseEntityUpdate): Promise<HouseEntity> => {
    return this.houseRepository.update(id, version, data);
  };
}
