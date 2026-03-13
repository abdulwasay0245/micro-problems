import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@/lib/db';

// Update issue status
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userResult = await sql`SELECT role FROM "User" WHERE email = ${session.user.email} LIMIT 1`;
  const user = userResult[0];

  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { status } = await request.json();

  const issueResult = await sql`
    UPDATE "Issue" 
    SET status = ${status}, "updatedAt" = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return NextResponse.json(issueResult[0]);
}

// Delete issue
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userResult = await sql`SELECT role FROM "User" WHERE email = ${session.user.email} LIMIT 1`;
  const user = userResult[0];

  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await sql`DELETE FROM "Issue" WHERE id = ${id}`;
  
  return NextResponse.json({ deleted: true });
}