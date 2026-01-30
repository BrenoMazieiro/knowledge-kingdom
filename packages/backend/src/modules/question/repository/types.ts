import type { BaseEntity } from '../../../infra/database/types';

export type QuestionEntity = BaseEntity & {
  houseId: string;
  creatorId: string;
  text: string;
  difficulty: string;
  explanation: string | null;
  sortOrder: number;
};

export type QuestionOptionEntity = {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  sortOrder: number;
  createdAt: Date;
};

export type QuestionEntityCreate = {
  houseId: string;
  creatorId: string;
  text: string;
  difficulty: string;
  explanation?: string | null;
};

export type QuestionEntityUpdate = {
  text?: string;
  difficulty?: string;
  explanation?: string | null;
};

export type QuestionOptionCreate = {
  questionId: string;
  text: string;
  isCorrect: boolean;
  sortOrder: number;
};

export interface IQuestionRepository {
  findOneById: (id: string, withDeleted?: boolean) => Promise<QuestionEntity>;
  findByHouseId: (houseId: string) => Promise<QuestionEntity[]>;
  findRandomByHouseId: (houseId: string, difficulty: string, count: number) => Promise<QuestionEntity[]>;
  countByHouseIdGroupedByDifficulty: (houseId: string) => Promise<Record<string, number>>;
  create: (data: QuestionEntityCreate) => Promise<QuestionEntity>;
  update: (id: string, version: number, data: QuestionEntityUpdate) => Promise<QuestionEntity>;
  softDelete: (id: string, version: number) => Promise<void>;
}

export interface IQuestionOptionRepository {
  findByQuestionId: (questionId: string) => Promise<QuestionOptionEntity[]>;
  findByQuestionIds: (questionIds: readonly string[]) => Promise<QuestionOptionEntity[]>;
  insertMany: (options: QuestionOptionCreate[]) => Promise<QuestionOptionEntity[]>;
  deleteByQuestionId: (questionId: string) => Promise<void>;
}
