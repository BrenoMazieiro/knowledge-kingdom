import { describe, it, expect, vi } from 'vitest';
import { UpdateVillageUseCase } from './updateVillageUseCase';
import { createVillageRepositoryMock } from '../repository/villageRepository.mock';

describe('UpdateVillageUseCase', () => {
  const setup = () => {
    const villageRepository = createVillageRepositoryMock();
    const useCase = new UpdateVillageUseCase(villageRepository);
    return { useCase, villageRepository };
  };

  it('should update and return the village', async () => {
    const { useCase, villageRepository } = setup();

    const updated = {
      id: 'village-1',
      version: 1,
      kingdomId: 'kingdom-1',
      name: 'Updated Physics',
      description: 'New description',
      iconUrl: null,
      sortOrder: 0,
      creatorId: null,
      chancellorId: null,
      managerId: null,
      visibility: 'PUBLIC' as const,
      status: 'ACTIVE' as const,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
      deletedAt: null,
    };

    villageRepository.update = vi.fn().mockImplementation(async () => updated);

    const result = await useCase.execute('village-1', 0, { name: 'Updated Physics', description: 'New description' });

    expect(result).toEqual(updated);
    expect(villageRepository.update).toHaveBeenCalledWith('village-1', 0, { name: 'Updated Physics', description: 'New description' });
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, villageRepository } = setup();
    const error = new Error('version mismatch');

    villageRepository.update = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('village-1', 0, { name: 'test' })).rejects.toThrow(error);
  });
});
