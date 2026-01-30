import { describe, it, expect, vi } from 'vitest';
import { UpdateContentResolver } from './updateContentResolver';
import type { IUpdateContentUseCase } from './updateContentUseCase';
import type { GraphQLContext } from '../../../context';
import { ForbiddenError } from '../../../infra/errors/forbiddenError';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('UpdateContentResolver', () => {
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
    const updateContentUseCase: IUpdateContentUseCase = {
      execute: vi.fn(),
    };
    const resolver = new UpdateContentResolver(updateContentUseCase);
    return { resolver, updateContentUseCase };
  };

  it('should validate input, call use case, and return mapped DTO', async () => {
    const { resolver, updateContentUseCase } = setup();

    const entity = {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      version: 2,
      houseId: 'h1',
      creatorId: 'u1',
      title: 'Updated Title',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'Updated desc',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
      deletedAt: null,
    };

    updateContentUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          version: 1,
          title: 'Updated Title',
        },
      },
      mockContext,
    );

    expect(updateContentUseCase.execute).toHaveBeenCalledWith(
      'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      1,
      { title: 'Updated Title' },
    );
    expect(result).toEqual({
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      version: 2,
      houseId: 'h1',
      creatorId: 'u1',
      title: 'Updated Title',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'Updated desc',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should throw ForbiddenError when BM lacks EDITOR permission', async () => {
    const { resolver } = setup();

    const contextWithoutPermission: GraphQLContext = {
      userId: null,
      bmId: 'bm-1',
      bmPermissionLevel: 'VIEWER',
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
            id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            version: 1,
            title: 'Updated Title',
          },
        },
        contextWithoutPermission,
      ),
    ).rejects.toThrow(ForbiddenError);
  });

  it('should throw UnauthorizedError when player tries to update (BM-only)', async () => {
    const { resolver } = setup();

    const playerContext: GraphQLContext = {
      userId: 'u1',
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
            id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            version: 1,
            title: 'Updated Title',
          },
        },
        playerContext,
      ),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, updateContentUseCase } = setup();
    const error = new Error('version mismatch');

    updateContentUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            version: 1,
            title: 'Updated Title',
          },
        },
        mockContext,
      ),
    ).rejects.toThrow(error);
  });
});
