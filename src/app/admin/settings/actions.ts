"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

const ALLOWED_KEYS = [
  "general_office_address",
  "contact_whatsapp",
  "contact_email",
  "contact_hours",
  "social_instagram",
  "social_facebook",
  "social_tiktok",
  "social_youtube",
  "payment_qris_image_url",
  "payment_bank_name",
  "payment_bank_account",
  "payment_bank_owner",
  "tracking_google_analytics",
  "tracking_meta_pixel",
];

export async function saveSettings(data: Record<string, string>) {
  try {
    await requireAdmin();

    const filtered = Object.fromEntries(
      Object.entries(data).filter(([key]) => ALLOWED_KEYS.includes(key))
    );

    const updates = Object.entries(filtered).map(async ([key, value]) => {
      return prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    });

    await Promise.all(updates);
    
    // Revalidate paths so changes show up in frontend immediately
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to save settings:", error);
    return { success: false, error: "Gagal menyimpan pengaturan" };
  }
}

