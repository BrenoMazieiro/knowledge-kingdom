import { describe, it, expect, vi } from 'vitest';
import { CreateContentResolver } from './createContentResolver';
import type { ICreateContentUseCase } from './createContentUseCase';
import type { GraphQLContext } from '../../../context';
import { ForbiddenError } from '../../../infra/errors/forbiddenError';

describe('CreateContentResolver', () => {
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
    const createContentUseCase: ICreateContentUseCase = {
      execute: vi.fn(),
    };
    const resolver = new CreateContentResolver(createContentUseCase);
    return { resolver, createContentUseCase };
  };

  it('should validate input, call use case, and return mapped DTO as player', async () => {
    const { resolver, createContentUseCase } = setup();

    const entity = {
      id: 'content-1',
      version: 0,
      houseId: 'h1',
      creatorId: 'u1',
      title: 'Intro to Math',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'A great video',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    createContentUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          houseId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          title: 'Intro to Math',
          type: 'VIDEO',
          url: 'https://example.com/video',
          description: 'A great video',
        },
      },
      mockContext,
    );

    expect(createContentUseCase.execute).toHaveBeenCalledWith(
      'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      'u1',
      'Intro to Math',
      'VIDEO',
      'https://example.com/video',
      null,
      'A great video',
    );
    expect(result).toEqual({
      id: 'content-1',
      version: 0,
      houseId: 'h1',
      creatorId: 'u1',
      title: 'Intro to Math',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'A great video',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should validate input, call use case, and return mapped DTO as BM', async () => {
    const { resolver, createContentUseCase } = setup();

    const bmContext: GraphQLContext = {
      userId: null,
      bmId: 'bm-1',
      bmPermissionLevel: 'EDITOR',
      isBlocked: false,
      req: {} as GraphQLContext['req'],
      res: {} as GraphQLContext['res'],
      session: null,
      loaders: {} as GraphQLContext['loaders'],
    };

    const entity = {
      id: 'content-1',
      version: 0,
      houseId: 'h1',
      creatorId: 'bm-1',
      title: 'Intro to Math',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'A great video',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    createContentUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve(
      {},
      {
        input: {
          houseId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          title: 'Intro to Math',
          type: 'VIDEO',
          url: 'https://example.com/video',
          description: 'A great video',
        },
      },
      bmContext,
    );

    expect(createContentUseCase.execute).toHaveBeenCalledWith(
      'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      'bm-1',
      'Intro to Math',
      'VIDEO',
      'https://example.com/video',
      null,
      'A great video',
    );
    expect(result).toEqual({
      id: 'content-1',
      version: 0,
      houseId: 'h1',
      creatorId: 'bm-1',
      title: 'Intro to Math',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'A great video',
      sortOrder: 1,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should throw ForbiddenError when BM lacks EDITOR permission', async () => {
    const { resolver } = setup();

    const bmContextWithoutPermission: GraphQLContext = {
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
            houseId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            title: 'Intro to Math',
            type: 'VIDEO',
            url: 'https://example.com/video',
          },
        },
        bmContextWithoutPermission,
      ),
    ).rejects.toThrow(ForbiddenError);
  });

  it('should throw ForbiddenError when player is blocked', async () => {
    const { resolver } = setup();

    const blockedPlayerContext: GraphQLContext = {
      userId: 'u1',
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: true,
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
            houseId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            title: 'Intro to Math',
            type: 'VIDEO',
            url: 'https://example.com/video',
          },
        },
        blockedPlayerContext,
      ),
    ).rejects.toThrow(ForbiddenError);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, createContentUseCase } = setup();
    const error = new Error('creation failed');

    createContentUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        {
          input: {
            houseId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            title: 'Intro to Math',
            type: 'VIDEO',
            url: 'https://example.com/video',
          },
        },
        mockContext,
      ),
    ).rejects.toThrow(error);
  });
});
