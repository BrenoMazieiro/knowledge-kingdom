import { getTransactionsInputSchema } from '@kk/shared/schemas/wallet';
import type { GraphQLContext } from '../../../context';
import type { IGetTransactionsUseCase, TransactionDTO } from '../types';
import type { TransactionEntity } from '../repository/types';
import { requireAuth } from '../../../infra/auth/guards';

export class GetTransactionsResolver {
  constructor(private readonly getTransactionsUseCase: IGetTransactionsUseCase) {}

  resolve = async (
    _parent: unknown,
    args: { input?: unknown },
    context: GraphQLContext,
  ): Promise<TransactionDTO[]> => {
    const userId = requireAuth(context);
    const input = getTransactionsInputSchema.parse(args.input ?? {});
    const txs = await this.getTransactionsUseCase.execute(userId, input.page, input.pageSize);
    return txs.map((tx) => this.mapToDto(tx));
  };

  private mapToDto(entity: TransactionEntity): TransactionDTO {
    return {
      id: entity.id,
      accountType: entity.accountType,
      accountId: entity.accountId,
      type: entity.type,
      amount: entity.amount,
      balanceAfter: entity.balanceAfter,
      referenceType: entity.referenceType,
      referenceId: entity.referenceId,
      description: entity.description,
      createdAt: entity.createdAt,
    };
  }
}
