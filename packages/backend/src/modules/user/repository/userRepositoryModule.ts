import { db } from '../../../infra/database/client';
import { UserRepository } from './userRepository';

export const userRepository = new UserRepository(db);
