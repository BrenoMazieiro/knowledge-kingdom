import { describe, it, expect, vi } from 'vitest';
import { GetContentsResolver } from './getContentsResolver';
import type { IGetContentsUseCase } from './getContentsUseCase';
import type { GraphQLContext } from '../../../context';

describe('GetContentsResolver', () => {
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
    const getContentsUseCase: IGetContentsUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetContentsResolver(getContentsUseCase);
    return { resolver, getContentsUseCase };
  };

  it('should call use case with houseId and return mapped DTOs', async () => {
    const { resolver, getContentsUseCase } = setup();

    const entities = [
      {
        id: 'content-1',
        version: 1,
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
      },
      {
        id: 'content-2',
        version: 0,
        houseId: 'h1',
        creatorId: 'u2',
        title: 'Advanced Physics',
        type: 'ARTICLE',
        url: 'https://example.com/article',
        body: null,
        description: null,
        sortOrder: 2,
        createdAt: new Date('2025-01-16'),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    getContentsUseCase.execute = vi.fn().mockImplementation(async () => entities);

    const result = await resolver.resolve({}, { houseId: 'h1' }, mockContext);

    expect(getContentsUseCase.execute).toHaveBeenCalledWith('h1');
    expect(result).toEqual([
      {
        id: 'content-1',
        version: 1,
        houseId: 'h1',
        creatorId: 'u1',
        title: 'Intro to Math',
        type: 'VIDEO',
        url: 'https://example.com/video',
        body: null,
        description: 'A great video',
        sortOrder: 1,
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'content-2',
        version: 0,
        houseId: 'h1',
        creatorId: 'u2',
        title: 'Advanced Physics',
        type: 'ARTICLE',
        url: 'https://example.com/article',
        body: null,
        description: null,
        sortOrder: 2,
        createdAt: new Date('2025-01-16'),
      },
    ]);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, getContentsUseCase } = setup();
    const error = new Error('database error');

    getContentsUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { houseId: 'h1' }, mockContext)).rejects.toThrow(error);
  });
});
