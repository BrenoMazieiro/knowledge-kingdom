import { describe, it, expect, vi } from 'vitest';
import { DeleteHouseResolver } from './deleteHouseResolver';
import type { GraphQLContext } from '../../../context';
import type { IDeleteHouseUseCase } from './deleteHouseUseCase';

describe('DeleteHouseResolver', () => {
  const setup = () => {
    const deleteHouseUseCase: IDeleteHouseUseCase = {
      execute: vi.fn(),
    };
    const resolver = new DeleteHouseResolver(deleteHouseUseCase);
    const context = {
      userId: null,
      bmId: 'bm-1',
      bmPermissionLevel: 'ADMIN',
      isBlocked: false,
      req: {},
      res: {},
      session: null,
      loaders: {},
    } as unknown as GraphQLContext;

    return { resolver, deleteHouseUseCase, context };
  };

  it('should delete a house and return true', async () => {
    const { resolver, deleteHouseUseCase, context } = setup();

    deleteHouseUseCase.execute = vi.fn().mockImplementation(async () => undefined);

    const result = await resolver.resolve({}, { id: 'h1', version: 1 }, context);

    expect(deleteHouseUseCase.execute).toHaveBeenCalledWith('h1', 1);
    expect(result).toBe(true);
  });

  it('should reject non-BM users', async () => {
    const { resolver } = setup();
    const playerContext = {
      userId: 'u1',
      bmId: null,
      bmPermissionLevel: null,
      isBlocked: false,
      req: {},
      res: {},
      session: null,
      loaders: {},
    } as unknown as GraphQLContext;

    await expect(resolver.resolve({}, { id: 'h1', version: 1 }, playerContext)).rejects.toThrow();
  });

  it('should propagate errors from deleteHouseUseCase', async () => {
    const { resolver, deleteHouseUseCase, context } = setup();
    const error = new Error('House not found');

    deleteHouseUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, { id: 'h1', version: 1 }, context)).rejects.toThrow(error);
  });
});
