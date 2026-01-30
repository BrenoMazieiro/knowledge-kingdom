import { describe, it, expect, vi } from 'vitest';
import { ExportMyDataUseCase } from './exportMyDataUseCase';
import { createUserRepositoryMock } from '../../user/repository/userRepository.mock';

describe('ExportMyDataUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const useCase = new ExportMyDataUseCase(
      userRepository,
    );
    return { useCase, userRepository };
  };

  it('should export user profile', async () => {
    const { useCase, userRepository } = setup();
    const now = new Date();

    userRepository.findOneById = vi.fn().mockImplementation(async () => ({
      id: 'user-1',
      email: 'test@test.com',
      name: 'Test User',
      gameName: 'testuser',
      isBlocked: false,
      blockReason: null,
      emailVerified: true,
      createdAt: now,
    }));

    const result = await useCase.execute('user-1');

    expect(result.profile.id).toBe('user-1');
    expect(result.profile.email).toBe('test@test.com');
    expect(result.exportedAt).toBeInstanceOf(Date);
  });

  it('should propagate errors from user repository', async () => {
    const { useCase, userRepository } = setup();
    const error = new Error('DB error');

    userRepository.findOneById = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('user-1')).rejects.toThrow(error);
  });
});
