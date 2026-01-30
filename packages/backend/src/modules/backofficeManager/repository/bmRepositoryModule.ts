import { db } from '../../../infra/database/client';
import { BMRepository } from './bmRepository';

export const bmRepository = new BMRepository(db);
