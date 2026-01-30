import type { GraphQLContext } from '../../context';
import type { ILeaderboardQuery, LeaderboardEntryDTO } from './types';

export class LeaderboardResolver {
  constructor(private readonly query: ILeaderboardQuery) {}

  resolve = async (
    _parent: unknown,
    args: { limit?: number },
    _context: GraphQLContext,
  ): Promise<LeaderboardEntryDTO[]> => {
    return this.query.execute(args.limit ?? 10);
  };
}
