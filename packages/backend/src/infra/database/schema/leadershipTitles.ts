import { pgTable, uuid, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { users } from './users';

export const leadershipTitles = pgTable(
  'leadership_titles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    entityType: text('entity_type').notNull(),
    entityId: uuid('entity_id').notNull(),
    playerId: uuid('player_id')
      .notNull()
      .references(() => users.id),
    title: text('title').notNull(),
    acquiredMethod: text('acquired_method').notNull(),
    gracePeriodUntil: timestamp('grace_period_until'),
    acquiredAt: timestamp('acquired_at').defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => [unique('leadership_titles_entity_unique').on(table.entityType, table.entityId)],
);
