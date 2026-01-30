import { eq, sql } from 'drizzle-orm';
import { AccountType, TransactionType } from '@kk/shared/constants/enums';
import { kingdoms } from '../../../infra/database/schema/kingdoms';
import { villages } from '../../../infra/database/schema/villages';
import { transactions } from '../../../infra/database/schema/transactions';
import type { DrizzleDB } from '../../../infra/database/client';
import type { TransactionEntity, ITreasuryRepository } from './types';

export class TreasuryRepository implements ITreasuryRepository {
  constructor(private readonly db: DrizzleDB) {}

  creditKingdomTreasury = async (
    kingdomId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ): Promise<TransactionEntity> => {
    const executor = tx ?? this.db;

    const updatedRows = await executor
      .update(kingdoms)
      .set({
        treasuryBalance: sql`${kingdoms.treasuryBalance} + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(kingdoms.id, kingdomId))
      .returning();

    const kingdom = updatedRows[0]!;

    const txRows = await executor
      .insert(transactions)
      .values({
        accountType: AccountType.KINGDOM_TREASURY,
        accountId: kingdomId,
        type: TransactionType.CREDIT,
        amount,
        balanceAfter: kingdom.treasuryBalance,
        referenceType: referenceType ?? null,
        referenceId: referenceId ?? null,
        description,
      })
      .returning();

    return this.toEntity(txRows[0]!);
  };

  creditVillageTreasury = async (
    villageId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ): Promise<TransactionEntity> => {
    const executor = tx ?? this.db;

    const updatedRows = await executor
      .update(villages)
      .set({
        treasuryBalance: sql`${villages.treasuryBalance} + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(villages.id, villageId))
      .returning();

    const village = updatedRows[0]!;

    const txRows = await executor
      .insert(transactions)
      .values({
        accountType: AccountType.VILLAGE_TREASURY,
        accountId: villageId,
        type: TransactionType.CREDIT,
        amount,
        balanceAfter: village.treasuryBalance,
        referenceType: referenceType ?? null,
        referenceId: referenceId ?? null,
        description,
      })
      .returning();

    return this.toEntity(txRows[0]!);
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
