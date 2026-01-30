import type { WalletEntity, TransactionEntity } from './repository/types';

export type WalletDTO = {
  id: string;
  playerId: string;
  balance: number;
  createdAt: Date;
};

export type TransactionDTO = {
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

export interface IGetWalletUseCase {
  execute: (playerId: string) => Promise<WalletEntity>;
}

export interface IGetTransactionsUseCase {
  execute: (playerId: string, page: number, pageSize: number) => Promise<TransactionEntity[]>;
}
