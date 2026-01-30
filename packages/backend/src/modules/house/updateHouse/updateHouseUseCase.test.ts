import { describe, it, expect, vi } from 'vitest';
import { UpdateHouseUseCase } from './updateHouseUseCase';
import { createHouseRepositoryMock } from '../repository/houseRepository.mock';
const setup = () => {
  const houseRepository = createHouseRepositoryMock();
  const useCase = new UpdateHouseUseCase(houseRepository);
  return { useCase, houseRepository };
};

describe('UpdateHouseUseCase', () => {
  it('should update house via repository', async () => {
    const { useCase, houseRepository } = setup();
    const updated = {
      id: 'h1',
      name: 'Updated House',
    };
    vi.mocked(houseRepository.update).mockImplementation(async () => updated as never);

    const result = await useCase.execute('h1', 1, { name: 'Updated House' });

    expect(houseRepository.update).toHaveBeenCalledWith('h1', 1, { name: 'Updated House' });
    expect(result).toEqual(updated);
  });

  it('should propagate repository errors', async () => {
    const { useCase, houseRepository } = setup();
    vi.mocked(houseRepository.update).mockImplementation(async () => { throw new Error('version mismatch'); });

    await expect(useCase.execute('h1', 1, { name: 'test' })).rejects.toThrow('version mismatch');
  });
});
