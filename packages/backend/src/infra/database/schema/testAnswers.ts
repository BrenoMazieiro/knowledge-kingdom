import { pgTable, uuid, boolean, timestamp } from 'drizzle-orm/pg-core';
import { testSessions } from './testSessions';
import { questions } from './questions';
import { questionOptions } from './questionOptions';

export const testAnswers = pgTable('test_answers', {
  id: uuid('id').defaultRandom().primaryKey(),
  testSessionId: uuid('test_session_id')
    .notNull()
    .references(() => testSessions.id),
  questionId: uuid('question_id')
    .notNull()
    .references(() => questions.id),
  selectedOptionId: uuid('selected_option_id').references(() => questionOptions.id),
  isCorrect: boolean('is_correct').default(false).notNull(),
  answeredAt: timestamp('answered_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
