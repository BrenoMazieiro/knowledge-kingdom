import { describe, it, expect, vi } from 'vitest';
import { UpdateVillageResolver } from './updateVillageResolver';
import type { IUpdateVillageUseCase } from './updateVillageUseCase';
import type { GraphQLContext } from '../../../context';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('UpdateVillageResolver', () => {
  const setup = () => {
    const updateVillageUseCase: IUpdateVillageUseCase = {
      execute: vi.fn(),
    };
    const resolver = new UpdateVillageResolver(updateVillageUseCase);
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
    return { resolver, updateVillageUseCase, context };
  };

  it('should validate input, call use case with id/version/data, and return mapped DTO', async () => {
    const { resolver, updateVillageUseCase, context } = setup();

    const entity = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      version: 1,
      kingdomId: 'kingdom-1',
      name: 'Updated Physics',
      description: 'New description',
      iconUrl: null,
      sortOrder: 0,
      creatorId: null,
      chancellorId: null,
      managerId: null,
      visibility: 'PUBLIC' as const,
      status: 'ACTIVE' as const,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
      deletedAt: null,
    };

    (updateVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          version: 0,
          name: 'Updated Physics',
          description: 'New description',
        },
      },
      context,
    );

    expect(updateVillageUseCase.execute).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440000',
      0,
      { name: 'Updated Physics', description: 'New description' },
    );
    expect(result).toEqual({
      id: '550e8400-e29b-41d4-a716-446655440000',
      version: 1,
      kingdomId: 'kingdom-1',
      name: 'Updated Physics',
      description: 'New description',
      iconUrl: null,
      sortOrder: 0,
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
      resolver.resolve({}, { input: { id: 'not-a-uuid', version: 0 } }, context),
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
            id: '550e8400-e29b-41d4-a716-446655440000',
            version: 0,
            name: 'Updated',
          },
        },
        context,
      ),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate use case errors', async () => {
    const { resolver, updateVillageUseCase, context } = setup();
    const error = new Error('version mismatch');

    (updateVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            version: 0,
            name: 'Updated',
          },
        },
        context,
      ),
    ).rejects.toThrow(error);
  });
});
