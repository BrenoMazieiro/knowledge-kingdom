import { describe, it, expect, vi } from 'vitest';
import { SignInResolver } from './signinResolver';
import type { GraphQLContext } from '../../../context';
import type { ISignInUseCase, IGetMeUseCase } from '../types';
import type { UserEntity } from '../../user/repository/types';

describe('SignInResolver', () => {
  const setup = () => {
    const signInUseCase: ISignInUseCase = {
      execute: vi.fn(),
    };
    const getMeUseCase: IGetMeUseCase = {
      execute: vi.fn(),
    };
    const resolver = new SignInResolver(signInUseCase, getMeUseCase);
    const context = {
      res: { cookie: vi.fn() },
    } as unknown as GraphQLContext;

    return { resolver, signInUseCase, getMeUseCase, context };
  };

  it('should sign in and return auth payload with cookie set', async () => {
    const { resolver, signInUseCase, getMeUseCase, context } = setup();

    signInUseCase.execute = vi.fn().mockImplementation(async () => ({
      userId: 'u1',
      sessionId: 'sid-1',
    }));

    const userEntity: UserEntity = {
      id: 'u1',
      email: 'alice@example.com',
      name: 'Alice',
      gameName: 'testuser',
      isBlocked: false,
      blockReason: null,
      emailVerified: true,
      passwordHash: 'hashed',
      verifyToken: null,
      verifyTokenExpiresAt: null,
      version: 1,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    getMeUseCase.execute = vi.fn().mockImplementation(async () => userEntity);

    const result = await resolver.resolve(
      {},
      { input: { email: 'alice@example.com', password: 'password1234' } },
      context,
    );

    expect(signInUseCase.execute).toHaveBeenCalledWith('alice@example.com', 'password1234');
    expect(getMeUseCase.execute).toHaveBeenCalledWith('u1');
    expect(context.res.cookie).toHaveBeenCalledWith(
      'session_id',
      'sid-1',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
      }),
    );
    expect(result).toEqual({
      user: {
        id: 'u1',
        email: 'alice@example.com',
        name: 'Alice',
        gameName: 'testuser',
        emailVerified: true,
        createdAt: new Date('2025-01-15'),
      },
    });
  });

  it('should propagate errors from signInUseCase', async () => {
    const { resolver, signInUseCase, context } = setup();
    const error = new Error('Invalid credentials');

    signInUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        { input: { email: 'alice@example.com', password: 'password1234' } },
        context,
      ),
    ).rejects.toThrow(error);
  });

  it('should propagate errors from getMeUseCase', async () => {
    const { resolver, signInUseCase, getMeUseCase, context } = setup();
    const error = new Error('User not found');

    signInUseCase.execute = vi.fn().mockImplementation(async () => ({
      userId: 'u1',
      sessionId: 'sid-1',
    }));

    getMeUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        { input: { email: 'alice@example.com', password: 'password1234' } },
        context,
      ),
    ).rejects.toThrow(error);
  });
});
