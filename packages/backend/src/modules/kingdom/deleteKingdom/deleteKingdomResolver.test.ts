import { describe, it, expect, vi } from 'vitest';
import { DeleteKingdomResolver } from './deleteKingdomResolver';
import type { IDeleteKingdomUseCase } from './deleteKingdomUseCase';
import type { GraphQLContext } from '../../../context';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('DeleteKingdomResolver', () => {
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
    const deleteKingdomUseCase: IDeleteKingdomUseCase = {
      execute: vi.fn(),
    };
    const resolver = new DeleteKingdomResolver(deleteKingdomUseCase);
    return { resolver, deleteKingdomUseCase };
  };

  it('should call use case with id and version, and return true', async () => {
    const { resolver, deleteKingdomUseCase } = setup();

    deleteKingdomUseCase.execute = vi.fn().mockImplementation(async () => {});

    const result = await resolver.resolve(
      {},
      { id: 'kingdom-1', version: 3 },
      mockContext,
    );

    expect(deleteKingdomUseCase.execute).toHaveBeenCalledWith('kingdom-1', 3);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedError when user lacks BM authentication', async () => {
    const { resolver } = setup();

    const contextWithoutPermission: GraphQLContext = {
      ...mockContext,
      bmId: null,
      bmPermissionLevel: null,
    };

    await expect(
      resolver.resolve({}, { id: 'kingdom-1', version: 0 }, contextWithoutPermission),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate errors from use case', async () => {
    const { resolver, deleteKingdomUseCase } = setup();
    const error = new Error('version mismatch');

    deleteKingdomUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve({}, { id: 'kingdom-1', version: 0 }, mockContext),
    ).rejects.toThrow(error);
  });
});
