import { db } from '../../../infra/database/client';
import { TreasuryRepository } from './treasuryRepository';

export const treasuryRepository = new TreasuryRepository(db);
