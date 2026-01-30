import { describe, it, expect, vi } from 'vitest';
import { GetVillageResolver } from './getVillageResolver';
import type { IGetVillageUseCase } from '../types';
import type { GraphQLContext } from '../../../context';

describe('GetVillageResolver', () => {
  const setup = () => {
    const getVillageUseCase: IGetVillageUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetVillageResolver(getVillageUseCase);
    const context = {
      userId: 'u1',
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {},
      res: {},
    } as unknown as GraphQLContext;
    return { resolver, getVillageUseCase, context };
  };

  it('should call use case with id and return mapped DTO', async () => {
    const { resolver, getVillageUseCase, context } = setup();

    const entity = {
      id: 'village-1',
      version: 0,
      kingdomId: 'kingdom-1',
      name: 'Physics',
      description: 'The physics village',
      iconUrl: 'https://example.com/icon.png',
      sortOrder: 2,
      creatorId: null,
      chancellorId: null,
      managerId: null,
      visibility: 'PUBLIC' as const,
      status: 'ACTIVE' as const,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    (getVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => entity);

    const result = await resolver.resolve({}, { id: 'village-1' }, context);

    expect(getVillageUseCase.execute).toHaveBeenCalledWith('village-1');
    expect(result).toEqual({
      id: 'village-1',
      version: 0,
      kingdomId: 'kingdom-1',
      name: 'Physics',
      description: 'The physics village',
      iconUrl: 'https://example.com/icon.png',
      sortOrder: 2,
      creatorId: null,
      chancellorId: null,
      managerId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should propagate use case errors', async () => {
    const { resolver, getVillageUseCase, context } = setup();
    const error = new Error('not found');

    (getVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { id: 'village-1' }, context)).rejects.toThrow(error);
  });
});
