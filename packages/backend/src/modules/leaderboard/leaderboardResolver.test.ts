import { describe, it, expect, vi } from 'vitest';
import { LeaderboardResolver } from './leaderboardResolver';
import type { ILeaderboardQuery } from './types';
import type { GraphQLContext } from '../../context';

describe('LeaderboardResolver', () => {
  const mockContext: GraphQLContext = {
    userId: 'u1',
    bmId: null,
    bmPermissionLevel: null,
    isBlocked: false,
    req: {} as GraphQLContext['req'],
    res: {} as GraphQLContext['res'],
    session: null,
    loaders: {} as GraphQLContext['loaders'],
  };

  const setup = () => {
    const query: ILeaderboardQuery = {
      execute: vi.fn(),
    };
    const resolver = new LeaderboardResolver(query);
    return { resolver, query };
  };

  it('should call query with provided limit and return entries', async () => {
    const { resolver, query } = setup();

    const entries = [
      {
        userId: 'user-1',
        gameName: 'Alice',
        totalQuills: 500,
        conquests: 10,
        badgesEarned: 3,
        rank: 1,
      },
      {
        userId: 'user-2',
        gameName: 'Bob',
        totalQuills: 300,
        conquests: 6,
        badgesEarned: 1,
        rank: 2,
      },
    ];

    query.execute = vi.fn().mockImplementation(async () => entries);

    const result = await resolver.resolve({}, { limit: 5 }, mockContext);

    expect(query.execute).toHaveBeenCalledWith(5);
    expect(result).toEqual(entries);
  });

  it('should default to limit 10 when no limit is provided', async () => {
    const { resolver, query } = setup();

    query.execute = vi.fn().mockImplementation(async () => []);

    await resolver.resolve({}, {}, mockContext);

    expect(query.execute).toHaveBeenCalledWith(10);
  });

  it('should propagate errors from query', async () => {
    const { resolver, query } = setup();
    const error = new Error('database error');

    query.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { limit: 10 }, mockContext)).rejects.toThrow(error);
  });
});
