import { neon } from '@neondatabase/serverless';

// The Neon driver allows you to execute raw SQL directly.
// We use a fallback empty string for Next.js build-time prerendering
const databaseUrl = process.env.DATABASE_URL || '';

export const sql = neon(databaseUrl);
