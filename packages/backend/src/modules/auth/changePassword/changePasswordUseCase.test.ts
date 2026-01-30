import { describe, it, expect, vi } from 'vitest';
import { ChangePasswordUseCase } from './changePasswordUseCase';
import { createUserRepositoryMock } from '../../user/repository/userRepository.mock';
import { createSessionRepositoryMock } from '../repository/sessionRepository.mock';
import { createAuthProviderMock } from '../localAuthProvider.mock';

describe('ChangePasswordUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const sessionRepository = createSessionRepositoryMock();
    const authProvider = createAuthProviderMock();
    const useCase = new ChangePasswordUseCase(userRepository, sessionRepository, authProvider);
    return { useCase, userRepository, sessionRepository, authProvider };
  };

  it('should verify current password, update hash, and destroy all sessions', async () => {
    const { useCase, userRepository, sessionRepository, authProvider } = setup();

    userRepository.findOneById = vi.fn().mockImplementation(async () => ({
      id: 'user-1',
      version: 0,
      email: 'test@test.com',
      name: 'Test',
      gameName: 'testuser',
      isBlocked: false,
      blockReason: null,
      passwordHash: 'hash',
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    }));

    authProvider.verifyCredentials = vi.fn().mockImplementation(async () => ({
      id: 'user-1',
      email: 'test@test.com',
      name: 'Test',
    }));

    userRepository.update = vi.fn().mockImplementation(async () => ({}));
    sessionRepository.destroyByUserId = vi.fn().mockImplementation(async () => undefined);

    await useCase.execute('user-1', 'old-pass', 'new-pass');

    expect(authProvider.verifyCredentials).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'old-pass',
    });
    expect(userRepository.update).toHaveBeenCalledWith('user-1', 0, {
      passwordHash: expect.any(String),
    });
    expect(sessionRepository.destroyByUserId).toHaveBeenCalledWith('user-1');
  });

  it('should throw if current password is wrong', async () => {
    const { useCase, userRepository, authProvider } = setup();

    userRepository.findOneById = vi.fn().mockImplementation(async () => ({
      id: 'user-1',
      version: 0,
      email: 'test@test.com',
      name: 'Test',
      gameName: 'testuser',
      isBlocked: false,
      blockReason: null,
      passwordHash: 'hash',
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    }));

    const error = new Error('Invalid credentials');
    authProvider.verifyCredentials = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('user-1', 'wrong', 'new-pass')).rejects.toThrow(error);
  });
});
