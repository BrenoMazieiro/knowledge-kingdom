import { describe, it, expect, vi } from 'vitest';
import { GetContentResolver } from './getContentResolver';
import type { IGetContentUseCase } from './getContentUseCase';
import type { GraphQLContext } from '../../../context';

describe('GetContentResolver', () => {
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
    const getContentUseCase: IGetContentUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetContentResolver(getContentUseCase);
    return { resolver, getContentUseCase };
  };

  it('should call use case with id and return mapped DTO', async () => {
    const { resolver, getContentUseCase } = setup();

    const entity = {
      id: 'content-1',
      version: 2,
      houseId: 'h1',
      creatorId: 'u1',
      title: 'Intro to Math',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'A great video',
      sortOrder: 3,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
      deletedAt: null,
    };

    getContentUseCase.execute = vi.fn().mockImplementation(async () => entity);

    const result = await resolver.resolve({}, { id: 'content-1' }, mockContext);

    expect(getContentUseCase.execute).toHaveBeenCalledWith('content-1');
    expect(result).toEqual({
      id: 'content-1',
      version: 2,
      houseId: 'h1',
      creatorId: 'u1',
      title: 'Intro to Math',
      type: 'VIDEO',
      url: 'https://example.com/video',
      body: null,
      description: 'A great video',
      sortOrder: 3,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should propagate errors from use case', async () => {
    const { resolver, getContentUseCase } = setup();
    const error = new Error('not found');

    getContentUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { id: 'content-1' }, mockContext)).rejects.toThrow(error);
  });
});
