import { db } from '../../../infra/database/client';
import { WalletRepository } from './walletRepository';

export const walletRepository = new WalletRepository(db);
