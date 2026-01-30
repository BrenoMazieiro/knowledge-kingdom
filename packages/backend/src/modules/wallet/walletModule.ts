import { walletRepository } from './repository/walletRepositoryModule';
import { transactionRepository } from './repository/transactionRepositoryModule';
import { GetWalletUseCase } from './getWallet/getWalletUseCase';
import { GetTransactionsUseCase } from './getTransactions/getTransactionsUseCase';
import { GetWalletResolver } from './getWallet/getWalletResolver';
import { GetTransactionsResolver } from './getTransactions/getTransactionsResolver';

const getWalletUseCase = new GetWalletUseCase(walletRepository);
const getTransactionsUseCase = new GetTransactionsUseCase(transactionRepository);

export const getWalletResolver = new GetWalletResolver(getWalletUseCase);
export const getTransactionsResolver = new GetTransactionsResolver(getTransactionsUseCase);
