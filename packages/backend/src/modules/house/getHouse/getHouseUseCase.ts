import type { IHouseRepository, HouseEntity } from '../repository/types';
import type { IGetHouseUseCase } from '../types';

export class GetHouseUseCase implements IGetHouseUseCase {
  constructor(private readonly houseRepository: IHouseRepository) {}

  execute = async (id: string): Promise<HouseEntity> => {
    return this.houseRepository.findOneById(id);
  };
}
