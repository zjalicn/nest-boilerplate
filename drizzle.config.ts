import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: './drizzle',
  verbose: true,
  strict: true,
});
