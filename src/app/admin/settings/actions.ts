"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveSettings(data: Record<string, string>) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized: Hanya Admin yang dapat mengubah pengaturan.");
    }

    const updates = Object.entries(data).map(async ([key, value]) => {
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
  } catch (error: any) {
    console.error("Failed to save settings:", error);
    return { success: false, error: error.message };
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
