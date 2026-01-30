import { db } from '../../infra/database/client';
import { LeaderboardQuery } from './leaderboardQuery';
import { LeaderboardResolver } from './leaderboardResolver';

const leaderboardQuery = new LeaderboardQuery(db);

export const leaderboardResolver = new LeaderboardResolver(leaderboardQuery);
