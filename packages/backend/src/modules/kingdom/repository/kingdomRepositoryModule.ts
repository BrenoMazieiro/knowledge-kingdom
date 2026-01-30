import { db } from '../../../infra/database/client';
import { KingdomRepository } from './kingdomRepository';

export const kingdomRepository = new KingdomRepository(db);
