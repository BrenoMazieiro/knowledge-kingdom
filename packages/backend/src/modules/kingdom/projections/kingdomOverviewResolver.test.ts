import { describe, it, expect, vi } from 'vitest';
import { KingdomOverviewResolver } from './kingdomOverviewResolver';
import type { KingdomOverviewQuery } from './kingdomOverviewQuery';
import type { GraphQLContext } from '../../../context';
import type { KingdomOverviewDTO } from '../types';

describe('KingdomOverviewResolver', () => {
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
    const query: KingdomOverviewQuery = {
      execute: vi.fn(),
    } as unknown as KingdomOverviewQuery;
    const resolver = new KingdomOverviewResolver(query);
    return { resolver, query };
  };

  it('should call query with kingdomId and return the overview DTO', async () => {
    const { resolver, query } = setup();

    const overview: KingdomOverviewDTO = {
      kingdom: {
        id: 'kingdom-1',
        version: 0,
        name: 'Science',
        description: null,
        iconUrl: null,
        sortOrder: 0,
        creatorId: null,
        kingQueenId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        treasuryBalance: 0,
        createdAt: new Date('2025-01-15'),
      },
      villageCount: 5,
      houseCount: 12,
      questionCount: 30,
      contentCount: 45,
    };

    query.execute = vi.fn().mockImplementation(async () => overview);

    const result = await resolver.resolve({}, { kingdomId: 'kingdom-1' }, mockContext);

    expect(query.execute).toHaveBeenCalledWith('kingdom-1');
    expect(result).toEqual(overview);
  });

  it('should propagate errors from query', async () => {
    const { resolver, query } = setup();
    const error = new Error('entity not found');

    query.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve({}, { kingdomId: 'kingdom-1' }, mockContext),
    ).rejects.toThrow(error);
  });
});
