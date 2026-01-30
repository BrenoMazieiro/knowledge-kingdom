import type { GraphQLContext } from '../../context';
import {
  createQuestionResolver,
  updateQuestionResolver,
  deleteQuestionResolver,
  getQuestionsResolver,
  getQuestionPoolResolver,
} from './questionModule';
import type { QuestionDTO } from './types';

export const questionResolvers = {
  Query: {
    questions: getQuestionsResolver.resolve,
    questionPool: getQuestionPoolResolver.resolve,
  },
  Mutation: {
    createQuestion: createQuestionResolver.resolve,
    updateQuestion: updateQuestionResolver.resolve,
    deleteQuestion: deleteQuestionResolver.resolve,
  },
  Question: {
    options: (parent: QuestionDTO, _args: unknown, context: GraphQLContext) =>
      context.loaders.questionOptionsByQuestionId.load(parent.id),
  },
};
