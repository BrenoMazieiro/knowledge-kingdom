import { describe, it, expect, vi } from 'vitest';
import { SignOutUseCase } from './signoutUseCase';
import { createSessionRepositoryMock } from '../repository/sessionRepository.mock';

describe('SignOutUseCase', () => {
  const setup = () => {
    const sessionRepository = createSessionRepositoryMock();
    const useCase = new SignOutUseCase(sessionRepository);
    return { useCase, sessionRepository };
  };

  it('should destroy the session', async () => {
    const { useCase, sessionRepository } = setup();

    sessionRepository.destroy = vi.fn().mockImplementation(async () => {});

    await useCase.execute('session-1');

    expect(sessionRepository.destroy).toHaveBeenCalledWith('session-1');
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, sessionRepository } = setup();
    const error = new Error('session not found');

    sessionRepository.destroy = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('session-1')).rejects.toThrow(error);
  });
});
