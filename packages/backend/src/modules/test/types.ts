import type { TestSessionEntity, TestAnswerEntity } from './repository/types';

export type TestSessionDTO = {
  id: string;
  playerId: string;
  houseId: string;
  attemptNumber: number;
  questionCount: number;
  correctCount: number;
  scorePercentage: number;
  tierAchieved: string | null;
  quillsEarned: number;
  isFirstOfDay: boolean;
  startedAt: Date;
  completedAt: Date | null;
};

export type TestAnswerDTO = {
  id: string;
  testSessionId: string;
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  answeredAt: Date | null;
};

export interface IStartTestUseCase {
  execute: (playerId: string, houseId: string) => Promise<{ session: TestSessionEntity; answers: TestAnswerEntity[] }>;
}

export interface ISubmitAnswerUseCase {
  execute: (playerId: string, answerId: string, selectedOptionId: string) => Promise<TestAnswerEntity>;
}

export interface ICompleteTestUseCase {
  execute: (playerId: string, testSessionId: string) => Promise<TestSessionEntity>;
}
