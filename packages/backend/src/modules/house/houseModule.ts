import { CreateHouseUseCase } from './createHouse/createHouseUseCase';
import { GetHouseUseCase } from './getHouse/getHouseUseCase';
import { GetHousesUseCase } from './getHouses/getHousesUseCase';
import { UpdateHouseUseCase } from './updateHouse/updateHouseUseCase';
import { DeleteHouseUseCase } from './deleteHouse/deleteHouseUseCase';
import { CreateHouseResolver } from './createHouse/createHouseResolver';
import { GetHouseResolver } from './getHouse/getHouseResolver';
import { GetHousesResolver } from './getHouses/getHousesResolver';
import { UpdateHouseResolver } from './updateHouse/updateHouseResolver';
import { DeleteHouseResolver } from './deleteHouse/deleteHouseResolver';
import { houseRepository } from './repository/houseRepositoryModule';

const createHouseUseCase = new CreateHouseUseCase(houseRepository);
const getHouseUseCase = new GetHouseUseCase(houseRepository);
const getHousesUseCase = new GetHousesUseCase(houseRepository);
const updateHouseUseCase = new UpdateHouseUseCase(houseRepository);
const deleteHouseUseCase = new DeleteHouseUseCase(houseRepository);

export const createHouseResolver = new CreateHouseResolver(createHouseUseCase);
export const getHouseResolver = new GetHouseResolver(getHouseUseCase);
export const getHousesResolver = new GetHousesResolver(getHousesUseCase);
export const updateHouseResolver = new UpdateHouseResolver(updateHouseUseCase);
export const deleteHouseResolver = new DeleteHouseResolver(deleteHouseUseCase);

