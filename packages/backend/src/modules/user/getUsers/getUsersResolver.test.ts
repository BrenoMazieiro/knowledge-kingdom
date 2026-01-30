import { describe, it, expect, vi } from 'vitest';
import { GetUsersResolver } from './getUsersResolver';
import type { IGetUsersUseCase } from './getUsersUseCase';
import type { GraphQLContext } from '../../../context';


describe('GetUsersResolver', () => {
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
    const getUsersUseCase: IGetUsersUseCase = {
      execute: vi.fn(),
    };
    const resolver = new GetUsersResolver(getUsersUseCase);
    return { resolver, getUsersUseCase };
  };

  it('should call use case and return mapped DTOs', async () => {
    const { resolver, getUsersUseCase } = setup();

    const entities = [
      {
        id: 'user-1',
        version: 1,
        email: 'alice@example.com',
        name: 'Alice',
        gameName: 'testuser',
        isBlocked: false,
        blockReason: null,
        passwordHash: 'hashed_pw_1',
        emailVerified: true,
        verifyToken: null,
        verifyTokenExpiresAt: null,
        createdAt: new Date('2025-01-15'),
        updatedAt: null,
        deletedAt: null,
      },
      {
        id: 'user-2',
        version: 0,
        email: 'bob@example.com',
        name: 'Bob',
        gameName: 'testuser',
        isBlocked: false,
        blockReason: null,
        passwordHash: 'hashed_pw_2',
        emailVerified: false,
        verifyToken: 'tok-123',
        verifyTokenExpiresAt: null,
        createdAt: new Date('2025-01-16'),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    getUsersUseCase.execute = vi.fn().mockImplementation(async () => entities);

    const result = await resolver.resolve({}, {}, mockContext);

    expect(getUsersUseCase.execute).toHaveBeenCalledWith();
    expect(result).toEqual([
      {
        id: 'user-1',
        email: 'alice@example.com',
        name: 'Alice',
        gameName: 'testuser',
        emailVerified: true,
        createdAt: new Date('2025-01-15'),
      },
      {
        id: 'user-2',
        email: 'bob@example.com',
        name: 'Bob',
        gameName: 'testuser',
        emailVerified: false,
        createdAt: new Date('2025-01-16'),
      },
    ]);
  });

  it('should throw ForbiddenError when BM lacks sufficient permission', async () => {
    const { resolver } = setup();

    const contextWithoutPermission: GraphQLContext = {
      ...mockContext,
      bmId: null,
      bmPermissionLevel: null,
    };

    await expect(resolver.resolve({}, {}, contextWithoutPermission)).rejects.toThrow();
  });

  it('should propagate errors from use case', async () => {
    const { resolver, getUsersUseCase } = setup();
    const error = new Error('database error');

    getUsersUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, {}, mockContext)).rejects.toThrow(error);
  });
});
