import { describe, it, expect, vi } from 'vitest';
import { GetHouseUseCase } from './getHouseUseCase';
import { createHouseRepositoryMock } from '../repository/houseRepository.mock';

describe('GetHouseUseCase', () => {
  const setup = () => {
    const houseRepository = createHouseRepositoryMock();
    const useCase = new GetHouseUseCase(houseRepository);
    return { useCase, houseRepository };
  };

  it('should return a house by id', async () => {
    const { useCase, houseRepository } = setup();

    const house = {
      id: 'house-1',
      version: 0,
      villageId: 'village-1',
      creatorId: 'user-1',
      name: 'Mechanics',
      description: null,
      iconUrl: null,
      isFree: true,
      entryPrice: 100,
      ownerType: 'PLAYER',
      managerId: null,
      testQuestionCount: 5,
      testEasyCount: 2,
      testMediumCount: 1,
      testHardCount: 2,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      blockReason: null,
      sortOrder: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    houseRepository.findOneById = vi.fn().mockImplementation(async () => house);

    const result = await useCase.execute('house-1');

    expect(result).toEqual(house);
    expect(houseRepository.findOneById).toHaveBeenCalledWith('house-1');
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, houseRepository } = setup();
    const error = new Error('not found');

    houseRepository.findOneById = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('house-1')).rejects.toThrow(error);
  });
});
