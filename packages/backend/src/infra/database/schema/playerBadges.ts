import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const playerBadges = pgTable('player_badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  playerId: uuid('player_id')
    .notNull()
    .references(() => users.id),
  badgeType: text('badge_type').notNull(),
  scopeType: text('scope_type').notNull(),
  scopeId: uuid('scope_id'),
  quillsEarned: integer('quills_earned').default(0).notNull(),
  earnedAt: timestamp('earned_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
