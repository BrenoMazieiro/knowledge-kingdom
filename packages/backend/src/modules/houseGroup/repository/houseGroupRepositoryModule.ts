import { db } from '../../../infra/database/client';
import { HouseGroupRepository } from './houseGroupRepository';
export const houseGroupRepository = new HouseGroupRepository(db);
