import { neon } from '@neondatabase/serverless';

// The Neon driver allows you to execute raw SQL directly.
// This requires the DATABASE_URL to be set in your environment variables.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export const sql = neon(process.env.DATABASE_URL);
