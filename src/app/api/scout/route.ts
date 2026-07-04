import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = formLimiter.check(`scout:${ip}`);
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    let city = formData.get("city") as string;
    const district = formData.get("district") as string;

    if (!fullName || !whatsapp || !email || !city) {
      return NextResponse.json(
        { success: false, error: "Harap isi semua kolom" },
        { status: 400 }
      );
    }

    if (district) {
      city = `${city} - Kec. ${district}`;
    }

    await prisma.propertyScout.create({
      data: {
        fullName,
        whatsapp,
        email,
        city,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal mendaftar Property Scout:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan sistem, silakan coba lagi" },
      { status: 500 }
    );
  }
}
