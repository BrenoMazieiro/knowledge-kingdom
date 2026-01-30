import { describe, it, expect, vi } from 'vitest';
import { CreateHouseUseCase } from './createHouseUseCase';
import { createHouseRepositoryMock } from '../repository/houseRepository.mock';

describe('CreateHouseUseCase', () => {
  const setup = () => {
    const houseRepository = createHouseRepositoryMock();
    const useCase = new CreateHouseUseCase(houseRepository);
    return { useCase, houseRepository };
  };

  it('should create and return a house', async () => {
    const { useCase, houseRepository } = setup();

    const house = {
      id: 'house-1',
      version: 0,
      villageId: 'village-1',
      creatorId: 'user-1',
      name: 'Mechanics',
      description: 'Classical mechanics',
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

    houseRepository.create = vi.fn().mockImplementation(async () => house);

    const result = await useCase.execute('village-1', 'user-1', 'Mechanics', 'Classical mechanics', null, true, null, 'PUBLIC');

    expect(result).toEqual(house);
    expect(houseRepository.create).toHaveBeenCalledWith({
      villageId: 'village-1',
      creatorId: 'user-1',
      name: 'Mechanics',
      description: 'Classical mechanics',
      iconUrl: null,
      isFree: true,
      entryPrice: null,
      visibility: 'PUBLIC',
    });
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, houseRepository } = setup();
    const error = new Error('database error');

    houseRepository.create = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('village-1', 'user-1', 'Test', null, null, true, null, 'PUBLIC')).rejects.toThrow(error);
  });
});
