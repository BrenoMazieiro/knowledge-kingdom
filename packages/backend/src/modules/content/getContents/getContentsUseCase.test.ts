import { describe, it, expect, vi } from 'vitest';
import { GetContentsUseCase } from './getContentsUseCase';
import { createContentRepositoryMock } from '../repository/contentRepository.mock';

const setup = () => {
  const contentRepository = createContentRepositoryMock();
  const useCase = new GetContentsUseCase(contentRepository);
  return { useCase, contentRepository };
};

describe('GetContentsUseCase', () => {
  it('should return contents by houseId', async () => {
    const { useCase, contentRepository } = setup();
    const contents = [
      { id: 'c1', title: 'Content 1' },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(contentRepository.findManyByHouseId).mockImplementation(async () => contents as any);

    const result = await useCase.execute('h1');

    expect(contentRepository.findManyByHouseId).toHaveBeenCalledWith('h1');
    expect(result).toEqual(contents);
  });

  it('should return empty array when no contents exist', async () => {
    const { useCase, contentRepository } = setup();
    vi.mocked(contentRepository.findManyByHouseId).mockImplementation(async () => []);

    const result = await useCase.execute('h1');

    expect(result).toEqual([]);
  });

  it('should propagate repository errors', async () => {
    const { useCase, contentRepository } = setup();
    vi.mocked(contentRepository.findManyByHouseId).mockImplementation(async () => { throw new Error('db error'); });

    await expect(useCase.execute('h1')).rejects.toThrow('db error');
  });
});
