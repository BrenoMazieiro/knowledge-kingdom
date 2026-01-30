import { db } from '../../../infra/database/client';
import { VillageRepository } from './villageRepository';

export const villageRepository = new VillageRepository(db);
