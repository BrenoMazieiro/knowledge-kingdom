import { db } from '../../../infra/database/client';
import { ContentRepository } from './contentRepository';

export const contentRepository = new ContentRepository(db);
