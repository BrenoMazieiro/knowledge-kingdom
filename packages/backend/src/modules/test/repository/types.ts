export type TestSessionEntity = {
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
  createdAt: Date;
};

export type TestAnswerEntity = {
  id: string;
  testSessionId: string;
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  answeredAt: Date | null;
  createdAt: Date;
};

export interface ITestSessionRepository {
  findOneById: (id: string) => Promise<TestSessionEntity>;
  findByPlayerAndHouse: (playerId: string, houseId: string) => Promise<TestSessionEntity[]>;
  countByPlayerAndHouse: (playerId: string, houseId: string) => Promise<number>;
  hasCompletedToday: (playerId: string) => Promise<boolean>;
  create: (data: {
    playerId: string;
    houseId: string;
    attemptNumber: number;
    questionCount: number;
    isFirstOfDay: boolean;
  }) => Promise<TestSessionEntity>;
  complete: (
    id: string,
    correctCount: number,
    scorePercentage: number,
    tierAchieved: string | null,
    quillsEarned: number,
  ) => Promise<TestSessionEntity>;
}

export interface ITestAnswerRepository {
  findOneById: (id: string) => Promise<TestAnswerEntity>;
  findByTestSessionId: (testSessionId: string) => Promise<TestAnswerEntity[]>;
  createMany: (answers: { testSessionId: string; questionId: string }[]) => Promise<TestAnswerEntity[]>;
  submitAnswer: (id: string, selectedOptionId: string, isCorrect: boolean) => Promise<TestAnswerEntity>;
}
