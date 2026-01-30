import type { GraphQLContext } from '../../../context';
import type { IEnterHouseUseCase } from './enterHouseUseCase';
import type { HouseEntryEntity } from '../repository/types';
import { requirePlayerNotBlocked } from '../../../infra/auth/guards';

export type HouseEntryDTO = {
  id: string;
  playerId: string;
  houseId: string;
  pricePaid: number;
  enteredAt: Date;
};

export class EnterHouseResolver {
  constructor(private readonly enterHouseUseCase: IEnterHouseUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { houseId: string },
    context: GraphQLContext,
  ): Promise<HouseEntryDTO> => {
    const userId = requirePlayerNotBlocked(context);
    const entry = await this.enterHouseUseCase.execute(userId, args.houseId);
    return this.mapToDto(entry);
  };

  private mapToDto(entity: HouseEntryEntity): HouseEntryDTO {
    return {
      id: entity.id,
      playerId: entity.playerId,
      houseId: entity.houseId,
      pricePaid: entity.pricePaid,
      enteredAt: entity.enteredAt,
    };
  }
}
