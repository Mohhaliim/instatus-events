import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  try {
    const events = await prisma.event.findMany({
      skip: (Number(page)- 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        occurred_at: "asc",
      }
    })

    return NextResponse.json({status: 200, events})
  } catch(error) {
   return NextResponse.json({status: 500, message: "Internal server error"})
  }
}


export async function POST(request: NextRequest) {
  const uid = new ShortUniqueId({ length: 12 });
  const uuid = uid.randomUUID();
  const id = `evt_${uuid}`;
}