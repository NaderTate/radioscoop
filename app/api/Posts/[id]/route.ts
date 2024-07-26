import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        PostMonth: { include: { year: true } },
        presenter: true,
        type: true,
      },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.error();
  }
}
