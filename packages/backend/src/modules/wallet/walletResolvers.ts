import { getWalletResolver, getTransactionsResolver } from './walletModule';

export const walletResolvers = {
  Query: {
    myWallet: getWalletResolver.resolve,
    myTransactions: getTransactionsResolver.resolve,
  },
};
