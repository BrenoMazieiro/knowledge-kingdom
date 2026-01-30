import { vi } from 'vitest';
import type { IContentRepository } from './types';

export const createContentRepositoryMock = (): IContentRepository => ({
  findOneById: vi.fn(),
  findManyByHouseId: vi.fn(),
  findManyByHouseIds: vi.fn(),
  findManyByIds: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
});
