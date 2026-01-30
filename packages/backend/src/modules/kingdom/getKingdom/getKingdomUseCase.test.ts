import { describe, it, expect, vi } from 'vitest';
import { GetKingdomUseCase } from './getKingdomUseCase';
import { createKingdomRepositoryMock } from '../repository/kingdomRepository.mock';

describe('GetKingdomUseCase', () => {
  const setup = () => {
    const kingdomRepository = createKingdomRepositoryMock();
    const useCase = new GetKingdomUseCase(kingdomRepository);
    return { useCase, kingdomRepository };
  };

  it('should return a kingdom by id', async () => {
    const { useCase, kingdomRepository } = setup();

    const kingdom = {
      id: 'kingdom-1',
      version: 0,
      name: 'Science',
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
      updatedAt: null,
      deletedAt: null,
    };

    kingdomRepository.findOneById = vi.fn().mockImplementation(async () => kingdom);

    const result = await useCase.execute('kingdom-1');

    expect(result).toEqual(kingdom);
    expect(kingdomRepository.findOneById).toHaveBeenCalledWith('kingdom-1');
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, kingdomRepository } = setup();
    const error = new Error('not found');

    kingdomRepository.findOneById = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('kingdom-1')).rejects.toThrow(error);
  });
});
