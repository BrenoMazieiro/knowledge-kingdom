import { describe, it, expect, vi } from 'vitest';
import { UpdateKingdomResolver } from './updateKingdomResolver';
import type { IUpdateKingdomUseCase } from './updateKingdomUseCase';
import type { GraphQLContext } from '../../../context';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('UpdateKingdomResolver', () => {
  const mockContext: GraphQLContext = {
    userId: null,
    bmId: 'bm-1',
    bmPermissionLevel: 'ADMIN',
    isBlocked: false,
    req: {} as GraphQLContext['req'],
    res: {} as GraphQLContext['res'],
    session: null,
    loaders: {} as GraphQLContext['loaders'],
  };

  const setup = () => {
    const updateKingdomUseCase: IUpdateKingdomUseCase = {
      execute: vi.fn(),
    };
    const resolver = new UpdateKingdomResolver(updateKingdomUseCase);
    return { resolver, updateKingdomUseCase };
  };

  it('should validate input, call use case with id, version, and update data, and return mapped DTO', async () => {
    const { resolver, updateKingdomUseCase } = setup();

    const entity = {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      version: 2,
      name: 'Science Updated',
      description: 'Updated description',
      iconUrl: null,
      sortOrder: 1,
      creatorId: null,
      kingQueenId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      blockReason: null,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-20'),
      deletedAt: null,
    };

    updateKingdomUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
          version: 1,
          name: 'Science Updated',
          description: 'Updated description',
        },
      },
      mockContext,
    );

    expect(updateKingdomUseCase.execute).toHaveBeenCalledWith(
      'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      1,
      { name: 'Science Updated', description: 'Updated description' },
    );
    expect(result).toEqual({
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      version: 2,
      name: 'Science Updated',
      description: 'Updated description',
      iconUrl: null,
      sortOrder: 1,
      creatorId: null,
      kingQueenId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should throw UnauthorizedError when user lacks BM authentication', async () => {
    const { resolver } = setup();

    const contextWithoutPermission: GraphQLContext = {
      ...mockContext,
      bmId: null,
      bmPermissionLevel: null,
    };

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            version: 1,
            name: 'Foo',
          },
        },
        contextWithoutPermission,
      ),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, updateKingdomUseCase } = setup();
    const error = new Error('version mismatch');

    updateKingdomUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            version: 1,
            name: 'Updated',
          },
        },
        mockContext,
      ),
    ).rejects.toThrow(error);
  });
});
