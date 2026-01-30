import { describe, it, expect, vi } from 'vitest';
import { DeleteVillageUseCase } from './deleteVillageUseCase';
import { createVillageRepositoryMock } from '../repository/villageRepository.mock';

describe('DeleteVillageUseCase', () => {
  const setup = () => {
    const villageRepository = createVillageRepositoryMock();
    const useCase = new DeleteVillageUseCase(villageRepository);
    return { useCase, villageRepository };
  };

  it('should soft delete the village', async () => {
    const { useCase, villageRepository } = setup();

    villageRepository.softDelete = vi.fn().mockImplementation(async () => {});

    await useCase.execute('village-1', 0);

    expect(villageRepository.softDelete).toHaveBeenCalledWith('village-1', 0);
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, villageRepository } = setup();
    const error = new Error('version mismatch');

    villageRepository.softDelete = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('village-1', 0)).rejects.toThrow(error);
  });
});
