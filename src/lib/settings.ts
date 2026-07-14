import { prisma } from "@/lib/prisma";

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
