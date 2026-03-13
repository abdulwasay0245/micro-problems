import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comments = await prisma.comment.findMany({
    where: { issueId: id },
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, image: true } } },
  });
  return NextResponse.json(comments);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const { content } = await request.json();

  const comment = await prisma.comment.create({
    data: { content, userId: user!.id, issueId: id },
    include: { user: { select: { name: true, image: true } } },
  });

  return NextResponse.json(comment);
}