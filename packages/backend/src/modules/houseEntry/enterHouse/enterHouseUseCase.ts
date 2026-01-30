import type { IHouseEntryRepository, HouseEntryEntity } from '../repository/types';
import type { IHouseRepository } from '../../house/repository/types';
import type { IWalletRepository } from '../../wallet/repository/types';
import { REVENUE_SPLIT } from '@kk/shared/constants/quills';
import { OwnerType } from '@kk/shared/constants/enums';

export interface IEnterHouseUseCase {
  execute: (playerId: string, houseId: string) => Promise<HouseEntryEntity>;
}

export class EnterHouseUseCase implements IEnterHouseUseCase {
  constructor(
    private readonly houseEntryRepository: IHouseEntryRepository,
    private readonly houseRepository: IHouseRepository,
    private readonly walletRepository: IWalletRepository,
  ) {}

  execute = async (playerId: string, houseId: string): Promise<HouseEntryEntity> => {
    // Check if already entered (idempotent)
    const existing = await this.houseEntryRepository.findByPlayerAndHouse(playerId, houseId);
    if (existing) return existing;

    const house = await this.houseRepository.findOneById(houseId);

    let pricePaid = 0;
    if (!house.isFree && house.entryPrice) {
      pricePaid = house.entryPrice;
      // Debit the player
      await this.walletRepository.debit(
        playerId,
        pricePaid,
        `House entry: ${house.name}`,
        'HOUSE',
        houseId,
      );

      // Credit owner if player-owned
      if (house.ownerType === OwnerType.PLAYER && house.creatorId) {
        const ownerShare = Math.floor(pricePaid * REVENUE_SPLIT.OWNER / 100);
        await this.walletRepository.credit(
          house.creatorId,
          ownerShare,
          `House entry revenue: ${house.name}`,
          'HOUSE',
          houseId,
        );
      }
    }

    return this.houseEntryRepository.create({ playerId, houseId, pricePaid });
  };
}
