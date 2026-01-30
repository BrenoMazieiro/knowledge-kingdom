import { describe, it, expect, vi } from 'vitest';
import { GetKingdomsUseCase } from './getKingdomsUseCase';
import { createKingdomRepositoryMock } from '../repository/kingdomRepository.mock';

describe('GetKingdomsUseCase', () => {
  const setup = () => {
    const kingdomRepository = createKingdomRepositoryMock();
    const useCase = new GetKingdomsUseCase(kingdomRepository);
    return { useCase, kingdomRepository };
  };

  it('should return all kingdoms', async () => {
    const { useCase, kingdomRepository } = setup();

    const kingdoms = [
      {
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
      },
      {
        id: 'kingdom-2',
        version: 0,
        name: 'Math',
        description: 'The math kingdom',
        iconUrl: null,
        sortOrder: 1,
        creatorId: null,
        kingQueenId: null,
        visibility: 'PUBLIC',
        status: 'ACTIVE',
        blockReason: null,
        treasuryBalance: 0,
        createdAt: new Date('2025-01-15'),
        updatedAt: null,
        deletedAt: null,
      },
    ];

    kingdomRepository.findAll = vi.fn().mockImplementation(async () => kingdoms);

    const result = await useCase.execute();

    expect(result).toEqual(kingdoms);
    expect(kingdomRepository.findAll).toHaveBeenCalledOnce();
  });

  it('should return empty array when no kingdoms exist', async () => {
    const { useCase, kingdomRepository } = setup();

    kingdomRepository.findAll = vi.fn().mockImplementation(async () => []);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, kingdomRepository } = setup();
    const error = new Error('database error');

    kingdomRepository.findAll = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute()).rejects.toThrow(error);
  });
});
