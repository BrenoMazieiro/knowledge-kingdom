import type { IHouseConquestRepository, HouseConquestEntity } from '../repository/types';
import type { IGetMyConquestsUseCase } from '../types';

export class GetMyConquestsUseCase implements IGetMyConquestsUseCase {
  constructor(private readonly houseConquestRepository: IHouseConquestRepository) {}

  execute = async (playerId: string): Promise<HouseConquestEntity[]> => {
    return this.houseConquestRepository.findByPlayerId(playerId);
  };
}
