import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";
import { ScoutSchema } from "@/lib/schemas";

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

    const raw = {
      fullName: formData.get("fullName"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      city: formData.get("city"),
      district: formData.get("district") || undefined,
    };

    const parsed = ScoutSchema.safeParse(raw);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const { fullName, whatsapp, email, city, district } = parsed.data;

    const finalCity = district ? `${city} - Kec. ${district}` : city;

    await prisma.propertyScout.create({
      data: {
        fullName,
        whatsapp,
        email,
        city: finalCity,
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

