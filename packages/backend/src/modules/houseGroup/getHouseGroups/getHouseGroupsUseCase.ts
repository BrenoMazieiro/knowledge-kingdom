import type { IHouseGroupRepository, HouseGroupEntity } from '../repository/types';
import type { IGetHouseGroupsUseCase } from '../types';

export class GetHouseGroupsUseCase implements IGetHouseGroupsUseCase {
  constructor(private readonly houseGroupRepository: IHouseGroupRepository) {}

  execute = async (villageId: string): Promise<HouseGroupEntity[]> => {
    return this.houseGroupRepository.findByVillageId(villageId);
  };
}
