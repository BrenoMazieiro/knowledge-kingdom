import { AccountType } from '@kk/shared/constants/enums';
import type { ITransactionRepository, TransactionEntity } from '../repository/types';
import type { IGetTransactionsUseCase } from '../types';

export class GetTransactionsUseCase implements IGetTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  execute = async (
    playerId: string,
    page: number,
    pageSize: number,
  ): Promise<TransactionEntity[]> => {
    return this.transactionRepository.findByAccountId(
      AccountType.PLAYER,
      playerId,
      page,
      pageSize,
    );
  };
}
