import { describe, it, expect, vi } from 'vitest';
import { GetMeUseCase } from './getMeUseCase';
import { createUserRepositoryMock } from '../../user/repository/userRepository.mock';

describe('GetMeUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const useCase = new GetMeUseCase(userRepository);
    return { useCase, userRepository };
  };

  it('should return the user for the given id', async () => {
    const { useCase, userRepository } = setup();

    const user = {
      id: 'user-1',
      version: 0,
      email: 'test@test.com',
      name: 'Test User',
      gameName: 'testuser',
      isBlocked: false,
      blockReason: null,
      passwordHash: 'hashed',
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    userRepository.findOneById = vi.fn().mockImplementation(async () => user);

    const result = await useCase.execute('user-1');

    expect(result).toEqual(user);
    expect(userRepository.findOneById).toHaveBeenCalledWith('user-1');
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, userRepository } = setup();
    const error = new Error('user not found');

    userRepository.findOneById = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('user-1')).rejects.toThrow(error);
  });
});
