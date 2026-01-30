import { describe, it, expect, vi } from 'vitest';
import { SignUpUseCase } from './signupUseCase';
import { createUserRepositoryMock } from '../../user/repository/userRepository.mock';
import { createSessionRepositoryMock } from '../repository/sessionRepository.mock';

describe('SignUpUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const sessionRepository = createSessionRepositoryMock();
    const walletRepository = { findByPlayerId: vi.fn(), create: vi.fn().mockResolvedValue({ id: 'wallet-1', playerId: 'user-1', balance: 0 }), credit: vi.fn(), debit: vi.fn() };
    const useCase = new SignUpUseCase(userRepository, sessionRepository, walletRepository);
    return { useCase, userRepository, sessionRepository, walletRepository };
  };

  it('should create user and session', async () => {
    const { useCase, userRepository, sessionRepository } = setup();

    userRepository.create = vi.fn().mockImplementation(async () => ({
      id: 'user-1',
      email: 'test@test.com',
      name: 'Test User',
    }));

    sessionRepository.create = vi.fn().mockImplementation(async () => 'session-1');

    const result = await useCase.execute('Test User', 'testuser', 'test@test.com', 'password123');

    expect(result.userId).toBe('user-1');
    expect(result.sessionId).toBe('session-1');
    expect(userRepository.create).toHaveBeenCalledOnce();
    expect(sessionRepository.create).toHaveBeenCalledWith({
      userId: 'user-1',
    });
  });

  it('should let errors from user creation bubble up', async () => {
    const { useCase, userRepository } = setup();
    const error = new Error('duplicate');

    userRepository.create = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('Test', 'testuser', 'test@test.com', 'pass1234')).rejects.toThrow(error);
  });
});
