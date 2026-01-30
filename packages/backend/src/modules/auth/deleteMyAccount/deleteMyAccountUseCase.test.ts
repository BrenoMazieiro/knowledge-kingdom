import { describe, it, expect, vi } from 'vitest';
import { DeleteMyAccountUseCase } from './deleteMyAccountUseCase';
import { createUserRepositoryMock } from '../../user/repository/userRepository.mock';
import { createSessionRepositoryMock } from '../repository/sessionRepository.mock';

describe('DeleteMyAccountUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const sessionRepository = createSessionRepositoryMock();
    const useCase = new DeleteMyAccountUseCase(userRepository, sessionRepository);
    return { useCase, userRepository, sessionRepository };
  };

  it('should destroy sessions and hard delete user', async () => {
    const { useCase, userRepository, sessionRepository } = setup();

    sessionRepository.destroyByUserId = vi.fn().mockImplementation(async () => undefined);
    userRepository.hardDelete = vi.fn().mockImplementation(async () => undefined);

    await useCase.execute('user-1');

    expect(sessionRepository.destroyByUserId).toHaveBeenCalledWith('user-1');
    expect(userRepository.hardDelete).toHaveBeenCalledWith('user-1');
  });

  it('should propagate errors from session destruction', async () => {
    const { useCase, sessionRepository } = setup();
    const error = new Error('Redis failure');

    sessionRepository.destroyByUserId = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('user-1')).rejects.toThrow(error);
  });
});
