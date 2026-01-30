import { houseEntryRepository } from './repository/houseEntryRepositoryModule';
import { houseRepository } from '../house/repository/houseRepositoryModule';
import { walletRepository } from '../wallet/repository/walletRepositoryModule';
import { EnterHouseUseCase } from './enterHouse/enterHouseUseCase';
import { EnterHouseResolver } from './enterHouse/enterHouseResolver';

const enterHouseUseCase = new EnterHouseUseCase(houseEntryRepository, houseRepository, walletRepository);
export const enterHouseResolver = new EnterHouseResolver(enterHouseUseCase);
