import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";

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

    const data = await req.json();

    if (!data.name?.trim() || !data.phone?.trim() || !data.type?.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama, nomor telepon, dan tipe permintaan wajib diisi." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        phone: data.phone,
        transactionType: data.transactionType,
        propertyType: data.propertyType,
        location: data.location,
        budgetOrPrice: data.budgetOrPrice,
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
