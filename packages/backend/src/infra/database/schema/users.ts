import { pgTable, uuid, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  gameName: text('game_name').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  verifyToken: text('verify_token'),
  verifyTokenExpiresAt: timestamp('verify_token_expires_at'),
  isBlocked: boolean('is_blocked').default(false).notNull(),
  blockReason: text('block_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
