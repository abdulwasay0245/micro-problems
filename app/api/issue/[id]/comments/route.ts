import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const commentsRaw = await sql`
    SELECT 
      c.*,
      u.name AS "userName",
      u.image AS "userImage"
    FROM "Comment" c
    LEFT JOIN "User" u ON c."userId" = u.id
    WHERE c."issueId" = ${id}
    ORDER BY c."createdAt" DESC
  `;

  // Map flat SQL result to Nested Object matching Prisma's shape
  const comments = commentsRaw.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    userId: comment.userId,
    issueId: comment.issueId,
    user: {
      name: comment.userName,
      image: comment.userImage,
    },
  }));

  return NextResponse.json(comments);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user ID based on session email
  const userResult = await sql`SELECT id, name, image FROM "User" WHERE email = ${session.user.email} LIMIT 1`;
  if (userResult.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const user = userResult[0];

  const { content } = await request.json();
  const commentId = nanoid(25);

  // Insert the comment
  const commentResult = await sql`
    INSERT INTO "Comment" (id, content, "userId", "issueId", "createdAt")
    VALUES (${commentId}, ${content}, ${user.id}, ${id}, NOW())
    RETURNING *
  `;

  const newComment = commentResult[0];

  // Return the comment matching Prisma's `include` shape
  const responseComment = {
    ...newComment,
    user: {
      name: user.name,
      image: user.image,
    },
  };

  return NextResponse.json(responseComment);
}