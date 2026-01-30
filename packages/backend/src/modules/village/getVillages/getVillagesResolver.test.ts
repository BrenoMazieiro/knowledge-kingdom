import { describe, it, expect, vi } from 'vitest';
import { GetVillagesResolver } from './getVillagesResolver';
import type { IGetVillagesUseCase } from '../types';
import type { GraphQLContext } from '../../../context';

describe('GetVillagesResolver', () => {
  const setup = () => {
    const getVillagesUseCase: IGetVillagesUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetVillagesResolver(getVillagesUseCase);
    const context = {
      userId: 'u1',
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {},
      res: {},
    } as unknown as GraphQLContext;
    return { resolver, getVillagesUseCase, context };
  };

  it('should call use case with kingdomId and return mapped DTOs', async () => {
    const { resolver, getVillagesUseCase, context } = setup();

    const entities = [
      {
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
        visibility: 'PUBLIC' as const,
        status: 'ACTIVE' as const,
        treasuryBalance: 0,
        createdAt: new Date('2025-01-15'),
        updatedAt: null,
        deletedAt: null,
      },
      {
        id: 'village-2',
        version: 1,
        kingdomId: 'kingdom-1',
        name: 'Chemistry',
        description: null,
        iconUrl: 'https://example.com/chem.png',
        sortOrder: 1,
        creatorId: null,
        chancellorId: null,
        managerId: null,
        visibility: 'PUBLIC' as const,
        status: 'ACTIVE' as const,
        treasuryBalance: 0,
        createdAt: new Date('2025-01-16'),
        updatedAt: new Date('2025-01-17'),
        deletedAt: null,
      },
    ];

    (getVillagesUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => entities);

    const result = await resolver.resolve({}, { kingdomId: 'kingdom-1' }, context);

    expect(getVillagesUseCase.execute).toHaveBeenCalledWith('kingdom-1');
    expect(result).toEqual([
      {
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
      {
        id: 'village-2',
        version: 1,
        kingdomId: 'kingdom-1',
        name: 'Chemistry',
        description: null,
        iconUrl: 'https://example.com/chem.png',
        sortOrder: 1,
        creatorId: null,
        chancellorId: null,
        managerId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        treasuryBalance: 0,
        createdAt: new Date('2025-01-16'),
      },
    ]);
  });

  it('should return empty array when use case returns no villages', async () => {
    const { resolver, getVillagesUseCase, context } = setup();

    (getVillagesUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => []);

    const result = await resolver.resolve({}, { kingdomId: 'kingdom-1' }, context);

    expect(result).toEqual([]);
  });

  it('should propagate use case errors', async () => {
    const { resolver, getVillagesUseCase, context } = setup();
    const error = new Error('database error');

    (getVillagesUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { kingdomId: 'kingdom-1' }, context)).rejects.toThrow(error);
  });
});
