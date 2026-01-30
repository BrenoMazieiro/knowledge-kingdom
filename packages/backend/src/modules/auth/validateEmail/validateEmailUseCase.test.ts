import { describe, it, expect, vi } from 'vitest';
import { ValidateEmailUseCase } from './validateEmailUseCase';
import { createUserRepositoryMock } from '../../user/repository/userRepository.mock';
import { ValidationError } from '../../../infra/errors/validationError';

describe('ValidateEmailUseCase', () => {
  const setup = () => {
    const userRepository = createUserRepositoryMock();
    const useCase = new ValidateEmailUseCase(userRepository);
    return { useCase, userRepository };
  };

  it('should find user by token and mark email as verified', async () => {
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
      emailVerified: false,
      verifyToken: 'some-token',
      verifyTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    userRepository.findOneByVerifyToken = vi.fn().mockImplementation(async () => user);
    userRepository.update = vi.fn().mockImplementation(async () => ({ ...user, emailVerified: true, verifyToken: null }));

    await useCase.execute('some-token');

    expect(userRepository.findOneByVerifyToken).toHaveBeenCalledWith('some-token');
    expect(userRepository.update).toHaveBeenCalledWith('user-1', 0, {
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
    });
  });

  it('should throw ValidationError when token has expired', async () => {
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
      emailVerified: false,
      verifyToken: 'expired-token',
      verifyTokenExpiresAt: new Date(Date.now() - 60 * 60 * 1000),
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    userRepository.findOneByVerifyToken = vi.fn().mockImplementation(async () => user);

    await expect(useCase.execute('expired-token')).rejects.toThrow(ValidationError);
    expect(userRepository.update).not.toHaveBeenCalled();
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, userRepository } = setup();
    const error = new Error('token not found');

    userRepository.findOneByVerifyToken = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('invalid-token')).rejects.toThrow(error);
  });
});
