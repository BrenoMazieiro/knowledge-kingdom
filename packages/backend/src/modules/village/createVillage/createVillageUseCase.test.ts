import { describe, it, expect, vi } from 'vitest';
import { CreateVillageUseCase } from './createVillageUseCase';
import { createVillageRepositoryMock } from '../repository/villageRepository.mock';

describe('CreateVillageUseCase', () => {
  const setup = () => {
    const villageRepository = createVillageRepositoryMock();
    const useCase = new CreateVillageUseCase(villageRepository);
    return { useCase, villageRepository };
  };

  it('should create and return a village', async () => {
    const { useCase, villageRepository } = setup();

    const village = {
      id: 'village-1',
      version: 0,
      kingdomId: 'kingdom-1',
      name: 'Physics',
      description: 'The physics village',
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

    villageRepository.create = vi.fn().mockImplementation(async () => village);

    const result = await useCase.execute('kingdom-1', 'Physics', 'The physics village', null);

    expect(result).toEqual(village);
    expect(villageRepository.create).toHaveBeenCalledWith({
      kingdomId: 'kingdom-1',
      name: 'Physics',
      description: 'The physics village',
      iconUrl: null,
    });
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, villageRepository } = setup();
    const error = new Error('unique constraint');

    villageRepository.create = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('kingdom-1', 'Physics', null, null)).rejects.toThrow(error);
  });
});
