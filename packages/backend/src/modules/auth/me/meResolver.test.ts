import { describe, it, expect, vi } from 'vitest';
import { MeResolver } from './meResolver';
import type { GraphQLContext } from '../../../context';
import type { IGetMeUseCase } from '../types';
import type { UserEntity } from '../../user/repository/types';

describe('MeResolver', () => {
  const setup = () => {
    const getMeUseCase: IGetMeUseCase = {
      execute: vi.fn(),
    };
    const resolver = new MeResolver(getMeUseCase);

    return { resolver, getMeUseCase };
  };

  it('should return null when context.userId is null', async () => {
    const { resolver } = setup();
    const context = {
      userId: null,
    } as unknown as GraphQLContext;

    const result = await resolver.resolve({}, {}, context);

    expect(result).toBeNull();
  });

  it('should return user DTO when context.userId is present', async () => {
    const { resolver, getMeUseCase } = setup();
    const context = {
      userId: 'u1',
    } as unknown as GraphQLContext;

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

    const result = await resolver.resolve({}, {}, context);

    expect(getMeUseCase.execute).toHaveBeenCalledWith('u1');
    expect(result).toEqual({
      id: 'u1',
      email: 'alice@example.com',
      name: 'Alice',
      gameName: 'testuser',
      emailVerified: true,
      createdAt: new Date('2025-01-15'),
    });
  });

  it('should propagate errors from getMeUseCase', async () => {
    const { resolver, getMeUseCase } = setup();
    const context = {
      userId: 'u1',
    } as unknown as GraphQLContext;
    const error = new Error('User not found');

    getMeUseCase.execute = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(resolver.resolve({}, {}, context)).rejects.toThrow(error);
  });
});
