import { testSessionRepository } from './repository/testSessionRepositoryModule';
import { testAnswerRepository } from './repository/testAnswerRepositoryModule';
import { houseEntryRepository } from '../houseEntry/repository/houseEntryRepositoryModule';
import { questionRepository } from '../question/repository/questionRepositoryModule';
import { questionOptionRepository } from '../question/repository/questionOptionRepositoryModule';
import { walletRepository } from '../wallet/repository/walletRepositoryModule';
import { houseRepository } from '../house/repository/houseRepositoryModule';
import { StartTestUseCase } from './startTest/startTestUseCase';
import { SubmitAnswerUseCase } from './submitAnswer/submitAnswerUseCase';
import { CompleteTestUseCase } from './completeTest/completeTestUseCase';
import { StartTestResolver } from './startTest/startTestResolver';
import { SubmitAnswerResolver } from './submitAnswer/submitAnswerResolver';
import { CompleteTestResolver } from './completeTest/completeTestResolver';

const startTestUseCase = new StartTestUseCase(
  testSessionRepository,
  testAnswerRepository,
  houseEntryRepository,
  questionRepository,
  walletRepository,
  houseRepository,
);
const submitAnswerUseCase = new SubmitAnswerUseCase(testAnswerRepository, questionOptionRepository);
const completeTestUseCase = new CompleteTestUseCase(testSessionRepository, testAnswerRepository, walletRepository);

export const startTestResolver = new StartTestResolver(startTestUseCase);
export const submitAnswerResolver = new SubmitAnswerResolver(submitAnswerUseCase);
export const completeTestResolver = new CompleteTestResolver(completeTestUseCase);
