import type { IWalletRepository, WalletEntity } from '../repository/types';
import type { IGetWalletUseCase } from '../types';

export class GetWalletUseCase implements IGetWalletUseCase {
  constructor(private readonly walletRepository: IWalletRepository) {}

  execute = async (playerId: string): Promise<WalletEntity> => {
    return this.walletRepository.findByPlayerId(playerId);
  };
}
