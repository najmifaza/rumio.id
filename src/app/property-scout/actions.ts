"use server";

import { prisma } from "@/lib/prisma";

export async function registerScout(formData: FormData) {
  try {
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
