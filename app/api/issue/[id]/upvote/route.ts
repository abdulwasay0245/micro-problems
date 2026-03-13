import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 1. Get user by email
  const userResult = await sql`SELECT id FROM "User" WHERE email = ${session.user.email} LIMIT 1`;
  if (userResult.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const userId = userResult[0].id;

  // 2. Check if upvote exists
  const existingResult = await sql`
    SELECT id FROM "Upvote" 
    WHERE "userId" = ${userId} AND "issueId" = ${id} 
    LIMIT 1
  `;

  if (existingResult.length > 0) {
    // 3a. Remove upvote
    const upvoteId = existingResult[0].id;
    await sql`DELETE FROM "Upvote" WHERE id = ${upvoteId}`;
    return NextResponse.json({ upvoted: false });
  } else {
    // 3b. Add upvote
    const newUpvoteId = nanoid(25);
    await sql`
      INSERT INTO "Upvote" (id, "userId", "issueId", "createdAt")
      VALUES (${newUpvoteId}, ${userId}, ${id}, NOW())
    `;
    return NextResponse.json({ upvoted: true });
  }
}