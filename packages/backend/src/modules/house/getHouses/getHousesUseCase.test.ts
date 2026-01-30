import { describe, it, expect, vi } from 'vitest';
import { GetHousesUseCase } from './getHousesUseCase';
import { createHouseRepositoryMock } from '../repository/houseRepository.mock';

describe('GetHousesUseCase', () => {
  const setup = () => {
    const houseRepository = createHouseRepositoryMock();
    const useCase = new GetHousesUseCase(houseRepository);
    return { useCase, houseRepository };
  };

  it('should return houses for a village', async () => {
    const { useCase, houseRepository } = setup();

    const houses = [
      { id: 'house-1', name: 'Mechanics' },
      { id: 'house-2', name: 'Optics' },
    ];

    houseRepository.findManyByVillageId = vi.fn().mockImplementation(async () => houses);

    const result = await useCase.execute('village-1');

    expect(result).toEqual(houses);
    expect(houseRepository.findManyByVillageId).toHaveBeenCalledWith('village-1');
  });

  it('should return empty array when no houses exist', async () => {
    const { useCase, houseRepository } = setup();

    houseRepository.findManyByVillageId = vi.fn().mockImplementation(async () => []);

    const result = await useCase.execute('village-1');

    expect(result).toEqual([]);
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, houseRepository } = setup();
    const error = new Error('database error');

    houseRepository.findManyByVillageId = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('village-1')).rejects.toThrow(error);
  });
});
