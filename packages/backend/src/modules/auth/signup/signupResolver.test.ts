import { describe, it, expect, vi } from 'vitest';
import { SignUpResolver } from './signupResolver';
import type { GraphQLContext } from '../../../context';
import type { ISignUpUseCase, IGetMeUseCase } from '../types';
import type { UserEntity } from '../../user/repository/types';

describe('SignUpResolver', () => {
  const setup = () => {
    const signUpUseCase: ISignUpUseCase = {
      execute: vi.fn(),
    };
    const getMeUseCase: IGetMeUseCase = {
      execute: vi.fn(),
    };
    const resolver = new SignUpResolver(signUpUseCase, getMeUseCase);
    const context = {
      res: { cookie: vi.fn() },
    } as unknown as GraphQLContext;

    return { resolver, signUpUseCase, getMeUseCase, context };
  };

  it('should sign up and return auth payload with cookie set', async () => {
    const { resolver, signUpUseCase, getMeUseCase, context } = setup();

    signUpUseCase.execute = vi.fn().mockImplementation(async () => ({
      userId: 'u1',
      sessionId: 'sid-1',
    }));

    const userEntity: UserEntity = {
      id: 'u1',
      email: 'bob@example.com',
      name: 'Bob',
      gameName: 'testuser',
      isBlocked: false,
      blockReason: null,
      emailVerified: false,
      passwordHash: 'hashed',
      verifyToken: 'vtoken-1',
      verifyTokenExpiresAt: null,
      version: 1,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    getMeUseCase.execute = vi.fn().mockImplementation(async () => userEntity);

    const result = await resolver.resolve(
      {},
      { input: { name: 'Bob', gameName: 'testuser', email: 'bob@example.com', password: 'password1234' } },
      context,
    );

    expect(signUpUseCase.execute).toHaveBeenCalledWith('Bob', 'testuser', 'bob@example.com', 'password1234');
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
        email: 'bob@example.com',
        name: 'Bob',
        gameName: 'testuser',
        emailVerified: false,
        createdAt: new Date('2025-01-15'),
      },
    });
  });

  it('should propagate errors from signUpUseCase', async () => {
    const { resolver, signUpUseCase, context } = setup();
    const error = new Error('Email already in use');

    signUpUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        { input: { name: 'Bob', gameName: 'testuser', email: 'bob@example.com', password: 'password1234' } },
        context,
      ),
    ).rejects.toThrow(error);
  });

  it('should propagate errors from getMeUseCase', async () => {
    const { resolver, signUpUseCase, getMeUseCase, context } = setup();
    const error = new Error('User not found');

    signUpUseCase.execute = vi.fn().mockImplementation(async () => ({
      userId: 'u1',
      sessionId: 'sid-1',
    }));

    getMeUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(
      resolver.resolve(
        {},
        { input: { name: 'Bob', gameName: 'testuser', email: 'bob@example.com', password: 'password1234' } },
        context,
      ),
    ).rejects.toThrow(error);
  });
});
