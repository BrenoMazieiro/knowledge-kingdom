import { describe, it, expect, vi } from 'vitest';
import { GetUsersUseCase } from './getUsersUseCase';
import { createUserRepositoryMock } from '../repository/userRepository.mock';

describe('GetUsersUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const useCase = new GetUsersUseCase(userRepository);
    return { useCase, userRepository };
  };

  it('should return all users', async () => {
    const { useCase, userRepository } = setup();

    const users = [
      {
        id: 'user-1',
        version: 0,
        email: 'alice@example.com',
        name: 'Alice',
        gameName: 'testuser',
        isBlocked: false,
        blockReason: null,
        passwordHash: 'hashed-password-1',
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
        passwordHash: 'hashed-password-2',
        emailVerified: false,
        verifyToken: 'some-token',
        verifyTokenExpiresAt: null,
        createdAt: new Date('2025-01-16'),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    userRepository.findAll = vi.fn().mockImplementation(async () => users);

    const result = await useCase.execute();

    expect(result).toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalledWith(false);
  });

  it('should return empty array when no users exist', async () => {
    const { useCase, userRepository } = setup();

    userRepository.findAll = vi.fn().mockImplementation(async () => []);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, userRepository } = setup();
    const error = new Error('database error');

    userRepository.findAll = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute()).rejects.toThrow(error);
  });
});
