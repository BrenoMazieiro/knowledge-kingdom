import { describe, it, expect, vi } from 'vitest';
import { CreateContentUseCase } from './createContentUseCase';
import { createContentRepositoryMock } from '../repository/contentRepository.mock';

describe('CreateContentUseCase', () => {
  const setup = () => {
    const contentRepository = createContentRepositoryMock();
    const useCase = new CreateContentUseCase(contentRepository);
    return { useCase, contentRepository };
  };

  it('should create and return content', async () => {
    const { useCase, contentRepository } = setup();

    const content = {
      id: 'content-1',
      version: 0,
      houseId: 'house-1',
      creatorId: 'user-1',
      title: 'Newton Laws',
      type: 'ARTICLE',
      url: 'https://example.com/newton',
      body: null,
      description: 'An article about Newton laws',
      sortOrder: 0,
      createdAt: new Date('2025-01-15'),
      updatedAt: null,
      deletedAt: null,
    };

    contentRepository.create = vi.fn().mockImplementation(async () => content);

    const result = await useCase.execute('house-1', 'user-1', 'Newton Laws', 'ARTICLE', 'https://example.com/newton', null, 'An article about Newton laws');

    expect(result).toEqual(content);
    expect(contentRepository.create).toHaveBeenCalledWith({
      houseId: 'house-1',
      creatorId: 'user-1',
      title: 'Newton Laws',
      type: 'ARTICLE',
      url: 'https://example.com/newton',
      body: null,
      description: 'An article about Newton laws',
    });
  });

  it('should let repository errors bubble up', async () => {
    const { useCase, contentRepository } = setup();
    const error = new Error('database error');

    contentRepository.create = vi.fn().mockImplementation(async () => {
      throw error;
    });

    await expect(useCase.execute('house-1', 'user-1', 'Test', 'ARTICLE', 'https://example.com', null, null)).rejects.toThrow(error);
  });
});
