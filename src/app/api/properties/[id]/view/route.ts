import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.property.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to increment view count:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
