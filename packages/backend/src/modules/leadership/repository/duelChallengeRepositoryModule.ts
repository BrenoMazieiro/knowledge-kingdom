import { db } from '../../../infra/database/client';
import { DuelChallengeRepository } from './duelChallengeRepository';
export const duelChallengeRepository = new DuelChallengeRepository(db);
