import { describe, it, expect, vi } from 'vitest';
import { GetContentUseCase } from './getContentUseCase';
import { createContentRepositoryMock } from '../repository/contentRepository.mock';

const setup = () => {
  const contentRepository = createContentRepositoryMock();
  const useCase = new GetContentUseCase(contentRepository);
  return { useCase, contentRepository };
};

describe('GetContentUseCase', () => {
  it('should return content by id', async () => {
    const { useCase, contentRepository } = setup();
    const content = { id: 'c1' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(contentRepository.findOneById).mockImplementation(async () => content as any);

    const result = await useCase.execute('c1');

    expect(contentRepository.findOneById).toHaveBeenCalledWith('c1');
    expect(result).toEqual(content);
  });

  it('should propagate repository errors', async () => {
    const { useCase, contentRepository } = setup();
    vi.mocked(contentRepository.findOneById).mockImplementation(async () => { throw new Error('not found'); });

    await expect(useCase.execute('c1')).rejects.toThrow('not found');
  });
});
