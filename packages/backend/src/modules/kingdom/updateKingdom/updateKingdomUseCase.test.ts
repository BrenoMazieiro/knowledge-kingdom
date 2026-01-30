import { describe, it, expect, vi } from 'vitest';
import { UpdateKingdomUseCase } from './updateKingdomUseCase';
import { createKingdomRepositoryMock } from '../repository/kingdomRepository.mock';

describe('UpdateKingdomUseCase', () => {
  const setup = () => {
    const kingdomRepository = createKingdomRepositoryMock();
    const useCase = new UpdateKingdomUseCase(kingdomRepository);
    return { useCase, kingdomRepository };
  };

  it('should update and return a kingdom', async () => {
    const { useCase, kingdomRepository } = setup();

    const kingdom = {
      id: 'kingdom-1',
      version: 1,
      name: 'Updated Science',
      description: null,
      iconUrl: null,
      sortOrder: 0,
      creatorId: null,
      kingQueenId: null,
      visibility: 'PUBLIC',
      status: 'ACTIVE',
      blockReason: null,
      treasuryBalance: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
      deletedAt: null,
    };

    kingdomRepository.update = vi.fn().mockImplementation(async () => kingdom);

    const result = await useCase.execute('kingdom-1', 0, { name: 'Updated Science' });

    expect(result).toEqual(kingdom);
    expect(kingdomRepository.update).toHaveBeenCalledWith('kingdom-1', 0, { name: 'Updated Science' });
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, kingdomRepository } = setup();
    const error = new Error('version mismatch');

    kingdomRepository.update = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('kingdom-1', 0, { name: 'New' })).rejects.toThrow(error);
  });
});
