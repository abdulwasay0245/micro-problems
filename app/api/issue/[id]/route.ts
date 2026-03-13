import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
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
    WHERE i.id = ${id}
    LIMIT 1
  `;

  if (issuesRaw.length === 0) {
    return NextResponse.json(null);
  }

  const issue = issuesRaw[0];

  const formattedIssue = {
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
  };

  return NextResponse.json(formattedIssue);
}