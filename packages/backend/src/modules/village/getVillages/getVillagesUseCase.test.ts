import { describe, it, expect, vi } from 'vitest';
import { GetVillagesUseCase } from './getVillagesUseCase';
import { createVillageRepositoryMock } from '../repository/villageRepository.mock';

describe('GetVillagesUseCase', () => {
  const setup = () => {
    const villageRepository = createVillageRepositoryMock();
    const useCase = new GetVillagesUseCase(villageRepository);
    return { useCase, villageRepository };
  };

  it('should return villages for a kingdom', async () => {
    const { useCase, villageRepository } = setup();

    const villages = [
      { id: 'village-1', name: 'Physics' },
      { id: 'village-2', name: 'Chemistry' },
    ];

    villageRepository.findManyByKingdomId = vi.fn().mockImplementation(async () => villages);

    const result = await useCase.execute('kingdom-1');

    expect(result).toEqual(villages);
    expect(villageRepository.findManyByKingdomId).toHaveBeenCalledWith('kingdom-1');
  });

  it('should return empty array when no villages exist', async () => {
    const { useCase, villageRepository } = setup();

    villageRepository.findManyByKingdomId = vi.fn().mockImplementation(async () => []);

    const result = await useCase.execute('kingdom-1');

    expect(result).toEqual([]);
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, villageRepository } = setup();
    const error = new Error('database error');

    villageRepository.findManyByKingdomId = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('kingdom-1')).rejects.toThrow(error);
  });
});
