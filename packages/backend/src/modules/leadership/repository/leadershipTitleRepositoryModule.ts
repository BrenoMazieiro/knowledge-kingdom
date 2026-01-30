import { db } from '../../../infra/database/client';
import { LeadershipTitleRepository } from './leadershipTitleRepository';
export const leadershipTitleRepository = new LeadershipTitleRepository(db);
