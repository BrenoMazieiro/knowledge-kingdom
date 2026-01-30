import type { IHouseRepository, HouseEntity } from '../repository/types';
import type { ICreateHouseUseCase } from '../types';

export class CreateHouseUseCase implements ICreateHouseUseCase {
  constructor(private readonly houseRepository: IHouseRepository) {}

  execute = async (
    villageId: string,
    creatorId: string,
    name: string,
    description: string | null,
    iconUrl: string | null,
    isFree: boolean,
    entryPrice: number | null,
    visibility: string,
  ): Promise<HouseEntity> => {
    return this.houseRepository.create({
      villageId,
      creatorId,
      name,
      description,
      iconUrl,
      isFree,
      entryPrice,
      visibility,
    });
  };
}
