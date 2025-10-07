import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updated = await prisma.post.update({
    where: { id: parseInt(params.id, 10) },
    data: body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: parseInt(params.id, 10) } });
  return NextResponse.json({ ok: true });
}
