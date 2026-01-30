import { vi } from 'vitest';
import type { IUserRepository } from './types';

export const createUserRepositoryMock = (): IUserRepository => ({
  findOneById: vi.fn(),
  findOneByEmail: vi.fn(),
  findOneByGameName: vi.fn(),
  findOneByVerifyToken: vi.fn(),
  findAll: vi.fn(),
  findManyByIds: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  hardDelete: vi.fn(),
});
