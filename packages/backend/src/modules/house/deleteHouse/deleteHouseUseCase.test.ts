import { describe, it, expect, vi } from 'vitest';
import { DeleteHouseUseCase } from './deleteHouseUseCase';
import { createHouseRepositoryMock } from '../repository/houseRepository.mock';

const setup = () => {
  const houseRepository = createHouseRepositoryMock();
  const useCase = new DeleteHouseUseCase(houseRepository);
  return { useCase, houseRepository };
};

describe('DeleteHouseUseCase', () => {
  it('should soft delete house via repository', async () => {
    const { useCase, houseRepository } = setup();
    vi.mocked(houseRepository.softDelete).mockImplementation(async () => undefined);

    await useCase.execute('h1', 1);

    expect(houseRepository.softDelete).toHaveBeenCalledWith('h1', 1);
  });

  it('should propagate repository errors', async () => {
    const { useCase, houseRepository } = setup();
    vi.mocked(houseRepository.softDelete).mockImplementation(async () => { throw new Error('not found'); });

    await expect(useCase.execute('h1', 1)).rejects.toThrow('not found');
  });
});
