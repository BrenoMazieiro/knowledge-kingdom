import { questionRepository } from './repository/questionRepositoryModule';
import { questionOptionRepository } from './repository/questionOptionRepositoryModule';
import { CreateQuestionUseCase } from './createQuestion/createQuestionUseCase';
import { UpdateQuestionUseCase } from './updateQuestion/updateQuestionUseCase';
import { DeleteQuestionUseCase } from './deleteQuestion/deleteQuestionUseCase';
import { GetQuestionsUseCase } from './getQuestions/getQuestionsUseCase';
import { GetQuestionPoolUseCase } from './getQuestionPool/getQuestionPoolUseCase';
import { CreateQuestionResolver } from './createQuestion/createQuestionResolver';
import { UpdateQuestionResolver } from './updateQuestion/updateQuestionResolver';
import { DeleteQuestionResolver } from './deleteQuestion/deleteQuestionResolver';
import { GetQuestionsResolver } from './getQuestions/getQuestionsResolver';
import { GetQuestionPoolResolver } from './getQuestionPool/getQuestionPoolResolver';

const createQuestionUseCase = new CreateQuestionUseCase(questionRepository, questionOptionRepository);
const updateQuestionUseCase = new UpdateQuestionUseCase(questionRepository, questionOptionRepository);
const deleteQuestionUseCase = new DeleteQuestionUseCase(questionRepository);
const getQuestionsUseCase = new GetQuestionsUseCase(questionRepository);
const getQuestionPoolUseCase = new GetQuestionPoolUseCase(questionRepository);

export const createQuestionResolver = new CreateQuestionResolver(createQuestionUseCase);
export const updateQuestionResolver = new UpdateQuestionResolver(updateQuestionUseCase);
export const deleteQuestionResolver = new DeleteQuestionResolver(deleteQuestionUseCase);
export const getQuestionsResolver = new GetQuestionsResolver(getQuestionsUseCase);
export const getQuestionPoolResolver = new GetQuestionPoolResolver(getQuestionPoolUseCase);
