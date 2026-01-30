import { vi } from 'vitest';
import type { ISessionRepository } from './types';

export const createSessionRepositoryMock = (): ISessionRepository => ({
  create: vi.fn(),
  findById: vi.fn(),
  refresh: vi.fn(),
  destroy: vi.fn(),
  destroyByUserId: vi.fn(),
});
