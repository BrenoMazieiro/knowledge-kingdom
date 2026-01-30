import { contentRepository } from './repository/contentRepositoryModule';
import { CreateContentUseCase } from './createContent/createContentUseCase';
import { GetContentUseCase } from './getContent/getContentUseCase';
import { GetContentsUseCase } from './getContents/getContentsUseCase';
import { UpdateContentUseCase } from './updateContent/updateContentUseCase';
import { DeleteContentUseCase } from './deleteContent/deleteContentUseCase';
import { CreateContentResolver } from './createContent/createContentResolver';
import { GetContentResolver } from './getContent/getContentResolver';
import { GetContentsResolver } from './getContents/getContentsResolver';
import { UpdateContentResolver } from './updateContent/updateContentResolver';
import { DeleteContentResolver } from './deleteContent/deleteContentResolver';

const createContentUseCase = new CreateContentUseCase(contentRepository);
const getContentUseCase = new GetContentUseCase(contentRepository);
const getContentsUseCase = new GetContentsUseCase(contentRepository);
const updateContentUseCase = new UpdateContentUseCase(contentRepository);
const deleteContentUseCase = new DeleteContentUseCase(contentRepository);

export const createContentResolver = new CreateContentResolver(createContentUseCase);
export const getContentResolver = new GetContentResolver(getContentUseCase);
export const getContentsResolver = new GetContentsResolver(getContentsUseCase);
export const updateContentResolver = new UpdateContentResolver(updateContentUseCase);
export const deleteContentResolver = new DeleteContentResolver(deleteContentUseCase);
