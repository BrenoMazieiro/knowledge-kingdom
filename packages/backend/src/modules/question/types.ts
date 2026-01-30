import type { QuestionEntity, QuestionOptionEntity } from './repository/types';

export type QuestionOptionDTO = {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  sortOrder: number;
};

export type QuestionDTO = {
  id: string;
  version: number;
  houseId: string;
  creatorId: string;
  text: string;
  difficulty: string;
  explanation: string | null;
  sortOrder: number;
  createdAt: Date;
};

export type QuestionWithOptionsDTO = QuestionDTO & {
  options: QuestionOptionDTO[];
};

export type QuestionPoolDTO = {
  houseId: string;
  counts: Record<string, number>;
  total: number;
};

export interface ICreateQuestionUseCase {
  execute: (
    houseId: string,
    creatorId: string,
    text: string,
    difficulty: string,
    explanation: string | null,
    options: { text: string; isCorrect: boolean }[],
  ) => Promise<{ question: QuestionEntity; options: QuestionOptionEntity[] }>;
}

export interface IUpdateQuestionUseCase {
  execute: (
    id: string,
    version: number,
    data: { text?: string; difficulty?: string; explanation?: string | null },
    options?: { text: string; isCorrect: boolean }[],
  ) => Promise<{ question: QuestionEntity; options: QuestionOptionEntity[] }>;
}

export interface IDeleteQuestionUseCase {
  execute: (id: string, version: number) => Promise<void>;
}

export interface IGetQuestionsUseCase {
  execute: (houseId: string) => Promise<QuestionEntity[]>;
}

export interface IGetQuestionPoolUseCase {
  execute: (houseId: string) => Promise<QuestionPoolDTO>;
}
