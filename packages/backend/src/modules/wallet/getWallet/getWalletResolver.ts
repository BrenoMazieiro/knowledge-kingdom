import type { GraphQLContext } from '../../../context';
import type { IGetWalletUseCase, WalletDTO } from '../types';
import type { WalletEntity } from '../repository/types';
import { requireAuth } from '../../../infra/auth/guards';

export class GetWalletResolver {
  constructor(private readonly getWalletUseCase: IGetWalletUseCase) {}

  resolve = async (
    _parent: unknown,
    _args: unknown,
    context: GraphQLContext,
  ): Promise<WalletDTO> => {
    const userId = requireAuth(context);
    const wallet = await this.getWalletUseCase.execute(userId);
    return this.mapToDto(wallet);
  };

  private mapToDto(entity: WalletEntity): WalletDTO {
    return {
      id: entity.id,
      playerId: entity.playerId,
      balance: entity.balance,
      createdAt: entity.createdAt,
    };
  }
}
