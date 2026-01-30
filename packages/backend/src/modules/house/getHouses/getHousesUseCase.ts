import type { IHouseRepository, HouseEntity } from '../repository/types';
import type { IGetHousesUseCase } from '../types';

export class GetHousesUseCase implements IGetHousesUseCase {
  constructor(private readonly houseRepository: IHouseRepository) {}

  execute = async (villageId: string): Promise<HouseEntity[]> => {
    return this.houseRepository.findManyByVillageId(villageId);
  };
}
