import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

// GET all issues
export async function GET() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, image: true } },
      _count: { select: { upvotes: true, comments: true } },
    },
  });
  return NextResponse.json(issues);
}

// POST create issue
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name || null,
        image: session.user.image || null,
      },
    });
  }

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      category: body.category,
      description: body.description,
      image: body.image,
      address: body.address,
      latitude: body.latitude,
      longitude: body.longitude,
      userId: user!.id,
    },
  });

  return NextResponse.json(issue);
}