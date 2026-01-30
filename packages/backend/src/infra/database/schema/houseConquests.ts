import { pgTable, uuid, text, integer, timestamp, unique } from 'drizzle-orm/pg-core';
import { users } from './users';
import { houses } from './houses';

export const houseConquests = pgTable(
  'house_conquests',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    playerId: uuid('player_id')
      .notNull()
      .references(() => users.id),
    houseId: uuid('house_id')
      .notNull()
      .references(() => houses.id),
    bestTier: text('best_tier').notNull(),
    bestScorePercentage: integer('best_score_percentage').notNull(),
    totalQuillsEarned: integer('total_quills_earned').default(0).notNull(),
    attemptCount: integer('attempt_count').default(1).notNull(),
    lastAttemptAt: timestamp('last_attempt_at').notNull(),
    nextRetryAvailableAt: timestamp('next_retry_available_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => [unique('house_conquests_player_house_unique').on(table.playerId, table.houseId)],
);
