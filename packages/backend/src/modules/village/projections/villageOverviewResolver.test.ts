import { describe, it, expect, vi } from 'vitest';
import { VillageOverviewResolver } from './villageOverviewResolver';
import type { VillageOverviewQuery } from './villageOverviewQuery';
import type { GraphQLContext } from '../../../context';
import type { VillageOverviewDTO } from '../types';

describe('VillageOverviewResolver', () => {
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
    const query: VillageOverviewQuery = {
      execute: vi.fn(),
    } as unknown as VillageOverviewQuery;
    const resolver = new VillageOverviewResolver(query);
    return { resolver, query };
  };

  it('should call query with villageId and userId from context, and return the overview DTO', async () => {
    const { resolver, query } = setup();

    const overview: VillageOverviewDTO = {
      village: {
        id: 'village-1',
        version: 0,
        kingdomId: 'kingdom-1',
        name: 'Physics',
        description: 'The physics village',
        iconUrl: null,
        sortOrder: 0,
        creatorId: null,
        chancellorId: null,
        managerId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        treasuryBalance: 0,
        createdAt: new Date('2025-01-15'),
      },
      houseCount: 4,
      questionCount: 10,
      contentCount: 15,
      conquests: 3,
      badgesEarned: 1,
    };

    query.execute = vi.fn().mockImplementation(async () => overview);

    const result = await resolver.resolve({}, { villageId: 'village-1' }, mockContext);

    expect(query.execute).toHaveBeenCalledWith('village-1', 'u1');
    expect(result).toEqual(overview);
  });

  it('should pass null userId when context has no userId', async () => {
    const { resolver, query } = setup();

    const contextWithoutUser: GraphQLContext = {
      ...mockContext,
      userId: null,
    };

    const overview: VillageOverviewDTO = {
      village: {
        id: 'village-1',
        version: 0,
        kingdomId: 'kingdom-1',
        name: 'Physics',
        description: null,
        iconUrl: null,
        sortOrder: 0,
        creatorId: null,
        chancellorId: null,
        managerId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        treasuryBalance: 0,
        createdAt: new Date('2025-01-15'),
      },
      houseCount: 4,
      questionCount: 10,
      contentCount: 15,
      conquests: 0,
      badgesEarned: 0,
    };

    query.execute = vi.fn().mockImplementation(async () => overview);

    const result = await resolver.resolve({}, { villageId: 'village-1' }, contextWithoutUser);

    expect(query.execute).toHaveBeenCalledWith('village-1', null);
    expect(result).toEqual(overview);
  });

  it('should propagate errors from query', async () => {
    const { resolver, query } = setup();
    const error = new Error('entity not found');

    query.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve({}, { villageId: 'village-1' }, mockContext),
    ).rejects.toThrow(error);
  });
});
