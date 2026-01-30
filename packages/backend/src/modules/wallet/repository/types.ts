import type { DrizzleDB } from '../../../infra/database/client';

export type WalletEntity = {
  id: string;
  playerId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export type TransactionEntity = {
  id: string;
  accountType: string;
  accountId: string;
  type: string;
  amount: number;
  balanceAfter: number;
  referenceType: string | null;
  referenceId: string | null;
  description: string | null;
  createdAt: Date;
};

export interface IWalletRepository {
  findByPlayerId: (playerId: string) => Promise<WalletEntity>;
  create: (playerId: string) => Promise<WalletEntity>;
  credit: (
    playerId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ) => Promise<{ wallet: WalletEntity; transaction: TransactionEntity }>;
  debit: (
    playerId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ) => Promise<{ wallet: WalletEntity; transaction: TransactionEntity }>;
}

export interface ITransactionRepository {
  findByAccountId: (
    accountType: string,
    accountId: string,
    page: number,
    pageSize: number,
  ) => Promise<TransactionEntity[]>;
}

export interface ITreasuryRepository {
  creditKingdomTreasury: (
    kingdomId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ) => Promise<TransactionEntity>;
  creditVillageTreasury: (
    villageId: string,
    amount: number,
    description: string,
    referenceType?: string,
    referenceId?: string,
    tx?: DrizzleDB,
  ) => Promise<TransactionEntity>;
}
