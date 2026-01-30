import { describe, it, expect, vi } from 'vitest';
import { DeleteKingdomUseCase } from './deleteKingdomUseCase';
import { createKingdomRepositoryMock } from '../repository/kingdomRepository.mock';

describe('DeleteKingdomUseCase', () => {
  const setup = () => {
    const kingdomRepository = createKingdomRepositoryMock();
    const useCase = new DeleteKingdomUseCase(kingdomRepository);
    return { useCase, kingdomRepository };
  };

  it('should soft delete a kingdom', async () => {
    const { useCase, kingdomRepository } = setup();

    kingdomRepository.softDelete = vi.fn().mockImplementation(async () => {});

    await useCase.execute('kingdom-1', 0);

    expect(kingdomRepository.softDelete).toHaveBeenCalledWith('kingdom-1', 0);
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, kingdomRepository } = setup();
    const error = new Error('version mismatch');

    kingdomRepository.softDelete = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('kingdom-1', 0)).rejects.toThrow(error);
  });
});
