import { startTestResolver, submitAnswerResolver, completeTestResolver } from './testModule';

export const testResolvers = {
  Mutation: {
    startTest: startTestResolver.resolve,
    submitAnswer: submitAnswerResolver.resolve,
    completeTest: completeTestResolver.resolve,
  },
};
