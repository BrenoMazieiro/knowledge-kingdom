import { houseGroupRepository } from './repository/houseGroupRepositoryModule';
import { CreateHouseGroupUseCase } from './createHouseGroup/createHouseGroupUseCase';
import { GetHouseGroupsUseCase } from './getHouseGroups/getHouseGroupsUseCase';
import { CreateHouseGroupResolver } from './createHouseGroup/createHouseGroupResolver';
import { GetHouseGroupsResolver } from './getHouseGroups/getHouseGroupsResolver';

const createHouseGroupUseCase = new CreateHouseGroupUseCase(houseGroupRepository);
const getHouseGroupsUseCase = new GetHouseGroupsUseCase(houseGroupRepository);

export const createHouseGroupResolver = new CreateHouseGroupResolver(createHouseGroupUseCase);
export const getHouseGroupsResolver = new GetHouseGroupsResolver(getHouseGroupsUseCase);
