import { db } from '../../../infra/database/client';
import { TransactionRepository } from './transactionRepository';

export const transactionRepository = new TransactionRepository(db);
