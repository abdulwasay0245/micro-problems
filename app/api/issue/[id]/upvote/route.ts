import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  const existing = await prisma.upvote.findFirst({
    where: { userId: user!.id, issueId: id },
  });

  if (existing) {
    await prisma.upvote.delete({ where: { id: existing.id } });
    return NextResponse.json({ upvoted: false });
  } else {
    await prisma.upvote.create({
      data: { userId: user!.id, issueId: id },
    });
    return NextResponse.json({ upvoted: true });
  }
}