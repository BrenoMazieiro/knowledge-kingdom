import { describe, it, expect, vi } from 'vitest';
import { CreateKingdomResolver } from './createKingdomResolver';
import type { ICreateKingdomUseCase } from './createKingdomUseCase';
import type { GraphQLContext } from '../../../context';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('CreateKingdomResolver', () => {
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
    const createKingdomUseCase: ICreateKingdomUseCase = {
      execute: vi.fn(),
    };
    const resolver = new CreateKingdomResolver(createKingdomUseCase);
    return { resolver, createKingdomUseCase };
  };

  it('should validate input, call use case, and return mapped DTO', async () => {
    const { resolver, createKingdomUseCase } = setup();

    const entity = {
      id: 'kingdom-1',
      version: 0,
      name: 'Science',
      description: 'The science kingdom',
      iconUrl: null,
      sortOrder: 1,
      creatorId: null,
      kingQueenId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      blockReason: null,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    createKingdomUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      { input: { name: 'Science', description: 'The science kingdom' } },
      mockContext,
    );

    expect(createKingdomUseCase.execute).toHaveBeenCalledWith('Science', 'The science kingdom', null);
    expect(result).toEqual({
      id: 'kingdom-1',
      version: 0,
      name: 'Science',
      description: 'The science kingdom',
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
      resolver.resolve({}, { input: { name: 'Science' } }, contextWithoutPermission),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, createKingdomUseCase } = setup();
    const error = new Error('unique constraint');

    createKingdomUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        { input: { name: 'Science', description: 'desc' } },
        mockContext,
      ),
    ).rejects.toThrow(error);
  });
});
