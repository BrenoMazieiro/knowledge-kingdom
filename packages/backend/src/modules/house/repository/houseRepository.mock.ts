import { vi } from 'vitest';
import type { IHouseRepository } from './types';

export const createHouseRepositoryMock = (): IHouseRepository => ({
  findOneById: vi.fn(),
  findManyByIds: vi.fn(),
  findManyByVillageId: vi.fn(),
  findManyByVillageIds: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
});
