import { pgTable, uuid, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { houses } from './houses';

export const testSessions = pgTable('test_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  playerId: uuid('player_id')
    .notNull()
    .references(() => users.id),
  houseId: uuid('house_id')
    .notNull()
    .references(() => houses.id),
  attemptNumber: integer('attempt_number').notNull(),
  questionCount: integer('question_count').notNull(),
  correctCount: integer('correct_count').default(0).notNull(),
  scorePercentage: integer('score_percentage').default(0).notNull(),
  tierAchieved: text('tier_achieved'),
  quillsEarned: integer('quills_earned').default(0).notNull(),
  isFirstOfDay: boolean('is_first_of_day').default(false).notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
