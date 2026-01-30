import { describe, it, expect, vi } from 'vitest';
import { SignOutResolver } from './signoutResolver';
import type { GraphQLContext } from '../../../context';
import type { ISignOutUseCase } from '../types';
import { UnauthorizedError } from '../../../infra/errors/unauthorizedError';

describe('SignOutResolver', () => {
  const setup = () => {
    const signOutUseCase: ISignOutUseCase = {
      execute: vi.fn(),
    };
    const resolver = new SignOutResolver(signOutUseCase);
    const context = {
      req: { cookies: { session_id: 'sid-1' } },
      res: { clearCookie: vi.fn() },
    } as unknown as GraphQLContext;

    return { resolver, signOutUseCase, context };
  };

  it('should sign out and clear cookie', async () => {
    const { resolver, signOutUseCase, context } = setup();

    signOutUseCase.execute = vi.fn().mockImplementation(async () => undefined);

    const result = await resolver.resolve({}, {}, context);

    expect(signOutUseCase.execute).toHaveBeenCalledWith('sid-1');
    expect(context.res.clearCookie).toHaveBeenCalledWith('session_id', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedError when no session cookie', async () => {
    const { resolver } = setup();
    const context = {
      req: { cookies: {} },
      res: { clearCookie: vi.fn() },
    } as unknown as GraphQLContext;

    await expect(resolver.resolve({}, {}, context)).rejects.toThrow(UnauthorizedError);
  });

  it('should throw UnauthorizedError when cookies object is undefined', async () => {
    const { resolver } = setup();
    const context = {
      req: {},
      res: { clearCookie: vi.fn() },
    } as unknown as GraphQLContext;

    await expect(resolver.resolve({}, {}, context)).rejects.toThrow(UnauthorizedError);
  });

  it('should propagate errors from signOutUseCase', async () => {
    const { resolver, signOutUseCase, context } = setup();
    const error = new Error('Redis failure');

    signOutUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, {}, context)).rejects.toThrow(error);
  });
});
