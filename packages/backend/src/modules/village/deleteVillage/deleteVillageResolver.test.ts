import { describe, it, expect, vi } from 'vitest';
import { DeleteVillageResolver } from './deleteVillageResolver';
import type { IDeleteVillageUseCase } from './deleteVillageUseCase';
import type { GraphQLContext } from '../../../context';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('DeleteVillageResolver', () => {
  const setup = () => {
    const deleteVillageUseCase: IDeleteVillageUseCase = {
      execute: vi.fn(),
    };
    const resolver = new DeleteVillageResolver(deleteVillageUseCase);
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
    return { resolver, deleteVillageUseCase, context };
  };

  it('should call use case with id and version, and return true', async () => {
    const { resolver, deleteVillageUseCase, context } = setup();

    (deleteVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => {});

    const result = await resolver.resolve({}, { id: 'village-1', version: 0 }, context);

    expect(deleteVillageUseCase.execute).toHaveBeenCalledWith('village-1', 0);
    expect(result).toBe(true);
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
      resolver.resolve({}, { id: 'village-1', version: 0 }, context),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate use case errors', async () => {
    const { resolver, deleteVillageUseCase, context } = setup();
    const error = new Error('version mismatch');

    (deleteVillageUseCase.execute as ReturnType<typeof vi.fn>).mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve({}, { id: 'village-1', version: 0 }, context),
    ).rejects.toThrow(error);
  });
});
