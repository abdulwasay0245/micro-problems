import { neon } from '@neondatabase/serverless';

// The Neon driver allows you to execute raw SQL directly.
// We use a fallback empty string for Next.js build-time prerendering
const databaseUrl =  'postgresql://neondb_owner:npg_7rv3cjVJdklZ@ep-broad-forest-a1k9uvnv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

export const sql = neon(databaseUrl);
