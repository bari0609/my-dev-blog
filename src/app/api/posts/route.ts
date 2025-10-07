import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const post = await prisma.post.create({ data: body });
  return NextResponse.json(post);
}
