import { houseConquestRepository } from './repository/houseConquestRepositoryModule';
import { GetMyConquestsUseCase } from './getMyConquests/getMyConquestsUseCase';
import { GetMyConquestsResolver } from './getMyConquests/getMyConquestsResolver';

const getMyConquestsUseCase = new GetMyConquestsUseCase(houseConquestRepository);
export const getMyConquestsResolver = new GetMyConquestsResolver(getMyConquestsUseCase);
