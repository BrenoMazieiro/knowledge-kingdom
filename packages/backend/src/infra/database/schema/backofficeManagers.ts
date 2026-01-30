import { pgTable, uuid, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const backofficeManagers = pgTable('backoffice_managers', {
  id: uuid('id').defaultRandom().primaryKey(),
  version: integer('version').default(0).notNull(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  permissionLevel: text('permission_level').notNull(),
  twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
  twoFactorSecret: text('two_factor_secret'),
  invitedById: uuid('invited_by_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});
