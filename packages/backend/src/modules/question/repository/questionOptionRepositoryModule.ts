import { db } from '../../../infra/database/client';
import { QuestionOptionRepository } from './questionOptionRepository';

export const questionOptionRepository = new QuestionOptionRepository(db);
