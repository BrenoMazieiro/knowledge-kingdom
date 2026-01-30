import { db } from '../../../infra/database/client';
import { QuestionRepository } from './questionRepository';

export const questionRepository = new QuestionRepository(db);
