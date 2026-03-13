import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@/lib/db';
import { nanoid } from 'nanoid';

// GET all issues
export async function GET() {
  const issuesRaw = await sql`
    SELECT 
      i.*,
      u.name AS "userName",
      u.image AS "userImage",
      CAST(COALESCE(u_counts.upvotes, 0) AS INTEGER) AS "upvoteCount",
      CAST(COALESCE(c_counts.comments, 0) AS INTEGER) AS "commentCount"
    FROM "Issue" i
    LEFT JOIN "User" u ON i."userId" = u.id
    LEFT JOIN (
      SELECT "issueId", COUNT(*) as upvotes FROM "Upvote" GROUP BY "issueId"
    ) u_counts ON u_counts."issueId" = i.id
    LEFT JOIN (
      SELECT "issueId", COUNT(*) as comments FROM "Comment" GROUP BY "issueId"
    ) c_counts ON c_counts."issueId" = i.id
    ORDER BY i."createdAt" DESC
  `;

  // Map flat SQL result to Nested Object matching Prisma's exact shape
  const issues = issuesRaw.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    category: issue.category,
    status: issue.status,
    image: issue.image,
    latitude: issue.latitude,
    longitude: issue.longitude,
    address: issue.address,
    city: issue.city,
    area: issue.area,
    createdAt: issue.createdAt,
    updatedAt: issue.updatedAt,
    userId: issue.userId,
    user: {
      name: issue.userName,
      image: issue.userImage,
    },
    _count: {
      upvotes: issue.upvoteCount,
      comments: issue.commentCount,
    },
  }));

  return NextResponse.json(issues);
}

// POST create issue
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Ensure user exists and get their ID (matching Prisma upsert logic)
  const userId = nanoid(25);
  const userResult = await sql`
    INSERT INTO "User" (id, email, name, image, role, "createdAt")
    VALUES (${userId}, ${session.user.email}, ${session.user.name || null}, ${session.user.image || null}, 'user', NOW())
    ON CONFLICT (email) DO UPDATE 
    SET name = EXCLUDED.name, image = EXCLUDED.image
    RETURNING id
  `;
  const matchedUserId = userResult[0].id;

  // Insert the issue
  const issueId = nanoid(25);
  const issueResult = await sql`
    INSERT INTO "Issue" (id, title, category, description, image, address, latitude, longitude, "userId", "createdAt", "updatedAt", status)
    VALUES (
      ${issueId}, 
      ${body.title}, 
      ${body.category}, 
      ${body.description}, 
      ${body.image}, 
      ${body.address}, 
      ${body.latitude}, 
      ${body.longitude}, 
      ${matchedUserId}, 
      NOW(), 
      NOW(),
      'pending'
    )
    RETURNING *
  `;

  return NextResponse.json(issueResult[0]);
}