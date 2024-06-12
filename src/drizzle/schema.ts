import { pgTable, text } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  username: text('username').notNull().unique().primaryKey(),
  password: text('hashed_password'),
});
