import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";
import { InquirySchema } from "@/lib/schemas";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = formLimiter.check(`inquiry:${ip}`);
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }

    const raw = await req.json();
    const parsed = InquirySchema.safeParse(raw);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const data = parsed.data;

    const inquiry = await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        phone: data.phone,
        transactionType: data.transactionType,
        propertyType: data.propertyType,
        location: data.location,
        ...(data.budgetOrPrice !== undefined && { budgetOrPrice: data.budgetOrPrice }),
        status: "NEW",
        details: ""
      },
    });
    
    revalidatePath("/admin", "layout");
    
    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim permintaan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
