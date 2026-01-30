import type { IHouseGroupRepository, HouseGroupEntity } from '../repository/types';
import type { ICreateHouseGroupUseCase } from '../types';

export class CreateHouseGroupUseCase implements ICreateHouseGroupUseCase {
  constructor(private readonly houseGroupRepository: IHouseGroupRepository) {}

  execute = async (
    villageId: string,
    name: string,
    description: string | null,
    createdByType: string,
    createdById: string,
  ): Promise<HouseGroupEntity> => {
    return this.houseGroupRepository.create({ villageId, name, description, createdByType, createdById });
  };
}
