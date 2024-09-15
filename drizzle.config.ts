import { defineConfig } from 'drizzle-kit';

const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    url: connectionString,
  },
  out: './drizzle',
  verbose: true,
  strict: true,
});
