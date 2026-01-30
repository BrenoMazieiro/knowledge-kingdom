import { describe, it, expect, vi } from 'vitest';
import { GetVillageUseCase } from './getVillageUseCase';
import { createVillageRepositoryMock } from '../repository/villageRepository.mock';

describe('GetVillageUseCase', () => {
  const setup = () => {
    const villageRepository = createVillageRepositoryMock();
    const useCase = new GetVillageUseCase(villageRepository);
    return { useCase, villageRepository };
  };

  it('should return a village by id', async () => {
    const { useCase, villageRepository } = setup();

    const village = {
      id: 'village-1',
      version: 0,
      kingdomId: 'kingdom-1',
      name: 'Physics',
      description: null,
      iconUrl: null,
      sortOrder: 0,
      creatorId: null,
      chancellorId: null,
      managerId: null,
      visibility: 'PUBLIC' as const,
      status: 'ACTIVE' as const,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    villageRepository.findOneById = vi.fn().mockImplementation(async () => village);

    const result = await useCase.execute('village-1');

    expect(result).toEqual(village);
    expect(villageRepository.findOneById).toHaveBeenCalledWith('village-1');
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, villageRepository } = setup();
    const error = new Error('not found');

    villageRepository.findOneById = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('village-1')).rejects.toThrow(error);
  });
});
