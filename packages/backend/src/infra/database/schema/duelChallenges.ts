import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const duelChallenges = pgTable('duel_challenges', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  challengerId: uuid('challenger_id')
    .notNull()
    .references(() => users.id),
  defenderId: uuid('defender_id')
    .notNull()
    .references(() => users.id),
  status: text('status').notNull(),
  challengerScore: integer('challenger_score'),
  defenderScore: integer('defender_score'),
  winnerId: uuid('winner_id').references(() => users.id),
  quillsCost: integer('quills_cost').notNull(),
  challengedAt: timestamp('challenged_at').defaultNow().notNull(),
  respondedAt: timestamp('responded_at'),
  completedAt: timestamp('completed_at'),
  nextChallengeAvailableAt: timestamp('next_challenge_available_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
