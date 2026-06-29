import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { viewLimiter } from "@/lib/rate-limit";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Rate limiting: max 10 per minute per IP+property
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = viewLimiter.check(`view:${ip}:${id}`);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: true }); // Silently ignore, don't reveal rate limit
    }
    
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

