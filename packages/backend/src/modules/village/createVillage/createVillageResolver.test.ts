import { describe, it, expect, vi } from 'vitest';
import { CreateVillageResolver } from './createVillageResolver';
import type { ICreateVillageUseCase } from '../types';
import type { GraphQLContext } from '../../../context';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('CreateVillageResolver', () => {
  const setup = () => {
    const createVillageUseCase: ICreateVillageUseCase = {
      execute: vi.fn(),
    };
    const resolver = new CreateVillageResolver(createVillageUseCase);
    const context: GraphQLContext = {
      userId: null,
      bmId: 'bm-1',
      bmPermissionLevel: 'ADMIN',
      isBlocked: false,
      req: {} as GraphQLContext['req'],
      res: {} as GraphQLContext['res'],
      session: null,
      loaders: {} as GraphQLContext['loaders'],
    };
    return { resolver, createVillageUseCase, context };
  };

  it('should validate input, call use case, and return mapped DTO', async () => {
    const { resolver, createVillageUseCase, context } = setup();

    const entity = {
      id: 'village-1',
      version: 0,
      kingdomId: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Physics',
      description: 'The physics village',
      iconUrl: null,
      sortOrder: 3,
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

    (createVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          kingdomId: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Physics',
          description: 'The physics village',
          iconUrl: null,
        },
      },
      context,
    );

    expect(createVillageUseCase.execute).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440000',
      'Physics',
      'The physics village',
      null,
    );
    expect(result).toEqual({
      id: 'village-1',
      version: 0,
      kingdomId: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Physics',
      description: 'The physics village',
      iconUrl: null,
      sortOrder: 3,
      creatorId: null,
      chancellorId: null,
      managerId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should reject invalid input via Zod validation', async () => {
    const { resolver, context } = setup();

    await expect(
      resolver.resolve({}, { input: { kingdomId: 'not-a-uuid', name: 'X' } }, context),
    ).rejects.toThrow();
  });

  it('should throw UnauthorizedError when user lacks BM authentication', async () => {
    const { resolver } = setup();
    const context: GraphQLContext = {
      userId: null,
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {} as GraphQLContext['req'],
      res: {} as GraphQLContext['res'],
      session: null,
      loaders: {} as GraphQLContext['loaders'],
    };

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            kingdomId: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Physics',
          },
        },
        context,
      ),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate use case errors', async () => {
    const { resolver, createVillageUseCase, context } = setup();
    const error = new Error('unique constraint');

    (createVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            kingdomId: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Physics',
            iconUrl: null,
          },
        },
        context,
      ),
    ).rejects.toThrow(error);
  });
});
