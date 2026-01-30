import { describe, it, expect, vi } from 'vitest';
import { GetKingdomsResolver } from './getKingdomsResolver';
import type { IGetKingdomsUseCase } from './getKingdomsUseCase';
import type { GraphQLContext } from '../../../context';

describe('GetKingdomsResolver', () => {
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
    const getKingdomsUseCase: IGetKingdomsUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetKingdomsResolver(getKingdomsUseCase);
    return { resolver, getKingdomsUseCase };
  };

  it('should call use case and return mapped DTOs', async () => {
    const { resolver, getKingdomsUseCase } = setup();

    const entities = [
      {
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
        blockReason: null,
        treasuryBalance: 0,
        createdAt: new Date('2025-01-15'),
        updatedAt: null,
        deletedAt: null,
      },
      {
        id: 'kingdom-2',
        version: 1,
        name: 'Math',
        description: 'The math kingdom',
        iconUrl: 'https://example.com/math.png',
        sortOrder: 1,
        creatorId: null,
        kingQueenId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        blockReason: null,
        treasuryBalance: 0,
        createdAt: new Date('2025-01-16'),
        updatedAt: new Date('2025-01-17'),
        deletedAt: null,
      },
    ];

    getKingdomsUseCase.execute = vi.fn().mockImplementation(async () => entities);

    const result = await resolver.resolve({}, {}, mockContext);

    expect(getKingdomsUseCase.execute).toHaveBeenCalledWith();
    expect(result).toEqual([
      {
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
      {
        id: 'kingdom-2',
        version: 1,
        name: 'Math',
        description: 'The math kingdom',
        iconUrl: 'https://example.com/math.png',
        sortOrder: 1,
        creatorId: null,
        kingQueenId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        treasuryBalance: 0,
        createdAt: new Date('2025-01-16'),
      },
    ]);
  });

  it('should return empty array when no kingdoms exist', async () => {
    const { resolver, getKingdomsUseCase } = setup();

    getKingdomsUseCase.execute = vi.fn().mockImplementation(async () => []);

    const result = await resolver.resolve({}, {}, mockContext);

    expect(result).toEqual([]);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, getKingdomsUseCase } = setup();
    const error = new Error('database failure');

    getKingdomsUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, {}, mockContext)).rejects.toThrow(error);
  });
});
