import { describe, it, expect, vi } from 'vitest';
import { CreateKingdomUseCase } from './createKingdomUseCase';
import { createKingdomRepositoryMock } from '../repository/kingdomRepository.mock';

describe('CreateKingdomUseCase', () => {
  const setup = () => {
    const kingdomRepository = createKingdomRepositoryMock();
    const useCase = new CreateKingdomUseCase(kingdomRepository);
    return { useCase, kingdomRepository };
  };

  it('should create and return a kingdom', async () => {
    const { useCase, kingdomRepository } = setup();

    const kingdom = {
      id: 'kingdom-1',
      version: 0,
      name: 'Science',
      description: 'The science kingdom',
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

    kingdomRepository.create = vi.fn().mockImplementation(async () => kingdom);

    const result = await useCase.execute('Science', 'The science kingdom', null);

    expect(result).toEqual(kingdom);
    expect(kingdomRepository.create).toHaveBeenCalledWith({
      name: 'Science',
      description: 'The science kingdom',
      iconUrl: null,
    });
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, kingdomRepository } = setup();
    const error = new Error('unique constraint');

    kingdomRepository.create = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('Science', null, null)).rejects.toThrow(error);
  });
});
