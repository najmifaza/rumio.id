"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";

export async function registerScout(formData: FormData) {
  try {
    // Rate limiting: max 5 per minute per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = formLimiter.check(`scout:${ip}`);
    if (!rateCheck.allowed) {
      return { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit." };
    }

    const fullName = formData.get("fullName") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;

    if (!fullName || !whatsapp || !email || !city) {
      return { success: false, error: "Harap isi semua kolom" };
    }

    await prisma.propertyScout.create({
      data: {
        fullName,
        whatsapp,
        email,
        city,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal mendaftar Property Scout:", error);
    return { success: false, error: "Terjadi kesalahan sistem, silakan coba lagi" };
  }
}

