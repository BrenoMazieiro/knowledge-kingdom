import { describe, it, expect, vi } from 'vitest';
import { UpdateContentUseCase } from './updateContentUseCase';
import { createContentRepositoryMock } from '../repository/contentRepository.mock';

const setup = () => {
  const contentRepository = createContentRepositoryMock();
  const useCase = new UpdateContentUseCase(contentRepository);
  return { useCase, contentRepository };
};

describe('UpdateContentUseCase', () => {
  it('should update content via repository', async () => {
    const { useCase, contentRepository } = setup();
    const updated = { id: 'c1', title: 'Updated' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(contentRepository.update).mockImplementation(async () => updated as any);

    const result = await useCase.execute('c1', 1, { title: 'Updated' });

    expect(contentRepository.update).toHaveBeenCalledWith('c1', 1, { title: 'Updated' });
    expect(result).toEqual(updated);
  });

  it('should propagate repository errors', async () => {
    const { useCase, contentRepository } = setup();
    vi.mocked(contentRepository.update).mockImplementation(async () => { throw new Error('version mismatch'); });

    await expect(useCase.execute('c1', 1, { title: 'test' })).rejects.toThrow('version mismatch');
  });
});
