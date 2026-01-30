import { eq, and, desc } from 'drizzle-orm';
import { transactions } from '../../../infra/database/schema/transactions';
import type { DrizzleDB } from '../../../infra/database/client';
import type { TransactionEntity, ITransactionRepository } from './types';

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByAccountId = async (
    accountType: string,
    accountId: string,
    page: number,
    pageSize: number,
  ): Promise<TransactionEntity[]> => {
    const offset = (page - 1) * pageSize;

    const rows = await this.db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.accountType, accountType),
          eq(transactions.accountId, accountId),
        ),
      )
      .orderBy(desc(transactions.createdAt))
      .limit(pageSize)
      .offset(offset);

    return rows.map((row) => this.toEntity(row));
  };

  private toEntity(row: typeof transactions.$inferSelect): TransactionEntity {
    return {
      id: row.id,
      accountType: row.accountType,
      accountId: row.accountId,
      type: row.type,
      amount: row.amount,
      balanceAfter: row.balanceAfter,
      referenceType: row.referenceType,
      referenceId: row.referenceId,
      description: row.description,
      createdAt: row.createdAt,
    };
  }
}
