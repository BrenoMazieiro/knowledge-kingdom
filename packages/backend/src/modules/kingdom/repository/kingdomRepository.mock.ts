import { vi } from 'vitest';
import type { IKingdomRepository } from './types';

export const createKingdomRepositoryMock = (): IKingdomRepository => ({
  findOneById: vi.fn(),
  findAll: vi.fn(),
  findManyByIds: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
});
