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

export async function getSettings(keys: string[]) {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: keys } }
    });
    
    const result: Record<string, string> = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return { success: false, data: {} };
  }
}
