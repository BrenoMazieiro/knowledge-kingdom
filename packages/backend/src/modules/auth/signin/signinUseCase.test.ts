import { describe, it, expect, vi } from 'vitest';
import { SignInUseCase } from './signinUseCase';
import { createAuthProviderMock } from '../localAuthProvider.mock';
import { createSessionRepositoryMock } from '../repository/sessionRepository.mock';

describe('SignInUseCase', () => {
  const setup = () => {
    const authProvider = createAuthProviderMock();
    const sessionRepository = createSessionRepositoryMock();
    const useCase = new SignInUseCase(authProvider, sessionRepository);
    return { useCase, authProvider, sessionRepository };
  };

  it('should verify credentials and create session', async () => {
    const { useCase, authProvider, sessionRepository } = setup();

    authProvider.verifyCredentials = vi.fn().mockImplementation(async () => ({
      id: 'user-1',
      email: 'test@test.com',
      name: 'Test User',
    }));

    sessionRepository.create = vi.fn().mockImplementation(async () => 'session-1');

    const result = await useCase.execute('test@test.com', 'password123');

    expect(result.userId).toBe('user-1');
    expect(result.sessionId).toBe('session-1');
  });

  it('should let auth errors bubble up', async () => {
    const { useCase, authProvider } = setup();
    const error = new Error('Invalid credentials');

    authProvider.verifyCredentials = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('test@test.com', 'wrong')).rejects.toThrow(error);
  });
});
