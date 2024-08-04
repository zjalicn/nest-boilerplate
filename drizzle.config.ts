import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  out: './drizzle',
  verbose: true,
  strict: true,
});
