import { vi } from 'vitest';
import type { IVillageRepository } from './types';

export const createVillageRepositoryMock = (): IVillageRepository => ({
  findOneById: vi.fn(),
  findManyByIds: vi.fn(),
  findManyByKingdomId: vi.fn(),
  findManyByKingdomIds: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
});
