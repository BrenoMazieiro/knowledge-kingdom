import { db } from '../../../infra/database/client';
import { TestSessionRepository } from './testSessionRepository';

export const testSessionRepository = new TestSessionRepository(db);
