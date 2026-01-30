import { db } from '../../../infra/database/client';
import { HouseConquestRepository } from './houseConquestRepository';

export const houseConquestRepository = new HouseConquestRepository(db);
