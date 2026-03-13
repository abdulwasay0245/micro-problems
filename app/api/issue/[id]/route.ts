import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, image: true } },
      _count: { select: { upvotes: true, comments: true } },
    },
  });
  return NextResponse.json(issue);
}