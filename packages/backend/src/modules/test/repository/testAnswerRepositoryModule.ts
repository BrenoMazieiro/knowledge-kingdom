import { db } from '../../../infra/database/client';
import { TestAnswerRepository } from './testAnswerRepository';

export const testAnswerRepository = new TestAnswerRepository(db);
