import { describe, it, expect, vi } from 'vitest';
import { DeleteContentUseCase } from './deleteContentUseCase';
import { createContentRepositoryMock } from '../repository/contentRepository.mock';

const setup = () => {
  const contentRepository = createContentRepositoryMock();
  const useCase = new DeleteContentUseCase(contentRepository);
  return { useCase, contentRepository };
};

describe('DeleteContentUseCase', () => {
  it('should soft delete content via repository', async () => {
    const { useCase, contentRepository } = setup();
    vi.mocked(contentRepository.softDelete).mockImplementation(async () => undefined);

    await useCase.execute('c1', 1);

    expect(contentRepository.softDelete).toHaveBeenCalledWith('c1', 1);
  });

  it('should propagate repository errors', async () => {
    const { useCase, contentRepository } = setup();
    vi.mocked(contentRepository.softDelete).mockImplementation(async () => { throw new Error('not found'); });

    await expect(useCase.execute('c1', 1)).rejects.toThrow('not found');
  });
});
