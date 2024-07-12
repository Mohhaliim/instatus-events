import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');
  const actorID = req.nextUrl.searchParams.get('actor_id');
  const targetID = req.nextUrl.searchParams.get('target_id');
  const actionID = req.nextUrl.searchParams.get('action_id');

  const whereClause: any = {};
  if (actorID) whereClause.actor_id = actorID;
  if (targetID) whereClause.target_id = targetID;
  if (actionID) whereClause.action = { path: ['id'], string_contains: actionID};

  console.log(whereClause)
  try {
    const events = await prisma.event.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        occurred_at: 'asc',
      },
      where: whereClause,
    });

    console.log(events)
    return NextResponse.json({ status: 200, events });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  const uid = new ShortUniqueId({ length: 12 });
  const eventID = `evt_${uid.randomUUID()}`;
  const requestID = `req_${uid.randomUUID()}`;
  const eventData = await req.json();

  eventData.metadata = {
    ...eventData.metadata,
    request_id: requestID,
  };

  try {
    const event = await prisma.event.create({
      data: {
        id: eventID,
        object: eventData.object,
        actor_id: eventData.actor_id,
        actor_name: eventData.actor_name,
        group: eventData.group,
        action: eventData.action,
        target_id: eventData.target_id,
        target_name: eventData.target_name,
        location: clientIp,
        metadata: eventData.metadata,
      },
    });

    return NextResponse.json({ status: 200, event });
  } catch {
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}
