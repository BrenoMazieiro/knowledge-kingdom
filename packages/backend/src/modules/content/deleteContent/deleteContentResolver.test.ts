import { describe, it, expect, vi } from 'vitest';
import { DeleteContentResolver } from './deleteContentResolver';
import type { IDeleteContentUseCase } from './deleteContentUseCase';
import type { GraphQLContext } from '../../../context';
import { ForbiddenError } from '../../../infra/errors/forbiddenError';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('DeleteContentResolver', () => {
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
    const deleteContentUseCase: IDeleteContentUseCase = {
      execute: vi.fn(),
    };
    const resolver = new DeleteContentResolver(deleteContentUseCase);
    return { resolver, deleteContentUseCase };
  };

  it('should call use case with id and version, and return true', async () => {
    const { resolver, deleteContentUseCase } = setup();

    deleteContentUseCase.execute = vi.fn().mockImplementation(async () => undefined);

    const result = await resolver.resolve({}, { id: 'content-1', version: 3 }, mockContext);

    expect(deleteContentUseCase.execute).toHaveBeenCalledWith('content-1', 3);
    expect(result).toBe(true);
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
      resolver.resolve({}, { id: 'content-1', version: 3 }, contextWithoutPermission),
    ).rejects.toThrow(ForbiddenError);
  });

  it('should throw UnauthorizedError when player tries to delete (BM-only)', async () => {
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
      resolver.resolve({}, { id: 'content-1', version: 3 }, playerContext),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, deleteContentUseCase } = setup();
    const error = new Error('not found');

    deleteContentUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve({}, { id: 'content-1', version: 3 }, mockContext),
    ).rejects.toThrow(error);
  });
});
