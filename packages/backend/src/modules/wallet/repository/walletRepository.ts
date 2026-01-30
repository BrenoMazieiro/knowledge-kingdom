import { eq, sql } from 'drizzle-orm';
import { AccountType, TransactionType } from '@kk/shared/constants/enums';
import { EntityName } from '@kk/shared/constants/entityName';
import { wallets } from '../../../infra/database/schema/wallets';
import { transactions } from '../../../infra/database/schema/transactions';
import { EntityNotFoundError } from '../../../infra/errors/entityNotFoundError';
import { DomainError } from '../../../infra/errors/domainError';
import type { DrizzleDB } from '../../../infra/database/client';
import type { WalletEntity, TransactionEntity, IWalletRepository } from './types';

export class WalletRepository implements IWalletRepository {
  constructor(private readonly db: DrizzleDB) {}

  findByPlayerId = async (playerId: string): Promise<WalletEntity> => {
    const rows = await this.db
      .select()
      .from(wallets)
      .where(eq(wallets.playerId, playerId));

    const row = rows[0];
    if (!row) {
      throw new EntityNotFoundError(EntityName.WALLET, { playerId });
    }
    return this.toWalletEntity(row);
  };

  create = async (playerId: string): Promise<WalletEntity> => {
    const rows = await this.db
      .insert(wallets)
      .values({ playerId })
      .returning();

    return this.toWalletEntity(rows[0]!);
  };

  credit = async (
    playerId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ) => {
    const executor = tx ?? this.db;
    return this.adjustBalance(executor, playerId, amount, TransactionType.CREDIT, description, referenceType, referenceId);
  };

  debit = async (
    playerId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ) => {
    const executor = tx ?? this.db;
    return this.adjustBalance(executor, playerId, amount, TransactionType.DEBIT, description, referenceType, referenceId);
  };

  private adjustBalance = async (
    executor: DrizzleDB,
    playerId: string,
    amount: number,
    type: TransactionType,
    description: string,
    referenceType?: string,
    referenceId?: string,
  ): Promise<{ wallet: WalletEntity; transaction: TransactionEntity }> => {
    const delta = type === TransactionType.CREDIT ? amount : -amount;

    // Atomic balance update with SELECT FOR UPDATE semantics via conditional update
    const updatedRows = await executor
      .update(wallets)
      .set({
        balance: sql`${wallets.balance} + ${delta}`,
        updatedAt: new Date(),
      })
      .where(
        type === TransactionType.DEBIT
          ? sql`${wallets.playerId} = ${playerId} AND ${wallets.balance} >= ${amount}`
          : eq(wallets.playerId, playerId),
      )
      .returning();

    const updatedWallet = updatedRows[0];
    if (!updatedWallet) {
      if (type === TransactionType.DEBIT) {
        throw new DomainError('INSUFFICIENT_BALANCE', 'Not enough Quills for this operation');
      }
      throw new EntityNotFoundError(EntityName.WALLET, { playerId });
    }

    const txRows = await executor
      .insert(transactions)
      .values({
        accountType: AccountType.PLAYER,
        accountId: playerId,
        type,
        amount,
        balanceAfter: updatedWallet.balance,
        referenceType: referenceType ?? null,
        referenceId: referenceId ?? null,
        description,
      })
      .returning();

    return {
      wallet: this.toWalletEntity(updatedWallet),
      transaction: this.toTransactionEntity(txRows[0]!),
    };
  };

  private toWalletEntity(row: typeof wallets.$inferSelect): WalletEntity {
    return {
      id: row.id,
      playerId: row.playerId,
      balance: row.balance,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private toTransactionEntity(row: typeof transactions.$inferSelect): TransactionEntity {
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
