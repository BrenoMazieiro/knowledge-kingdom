import { db } from '../../../infra/database/client';
import { HouseEntryRepository } from './houseEntryRepository';

export const houseEntryRepository = new HouseEntryRepository(db);
