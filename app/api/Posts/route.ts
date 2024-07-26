import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        PostMonth: { include: { year: true } },
        presenter: true,
        type: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.error();
  }
}
