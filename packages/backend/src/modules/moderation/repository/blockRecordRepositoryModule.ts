import { db } from '../../../infra/database/client';
import { BlockRecordRepository } from './blockRecordRepository';
export const blockRecordRepository = new BlockRecordRepository(db);
