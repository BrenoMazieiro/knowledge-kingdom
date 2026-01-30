import { db } from '../../../infra/database/client';
import { PlayerBadgeRepository } from './playerBadgeRepository';
export const playerBadgeRepository = new PlayerBadgeRepository(db);
