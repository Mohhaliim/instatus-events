import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const distinctActorNames = await prisma.event.findMany({
      select: {
        actor_name: true,
        actor_id: true,
      },
      distinct: ['actor_id'],
    });

    const distinctTargetNames = await prisma.event.findMany({
      select: {
        target_name: true,
        target_id:  true,
      },
      distinct: ['target_id'],
    });

    const distinctActions = await prisma.event.findMany({
      select: {
        action: true,
      },
      distinct: ['action'],
    });

    const filters = {
      actors: distinctActorNames,
      targets: distinctTargetNames,
      actions: distinctActions.map((event) => event.action),
    };

    return NextResponse.json({ status: 200, filters });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}
