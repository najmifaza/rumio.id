"use server";

import { prisma } from "@/lib/prisma";

export async function trackWhatsAppClick(propertySlug: string) {
  try {
    await prisma.$executeRawUnsafe(
      `UPDATE property SET whatsappClicks = whatsappClicks + 1 WHERE slug = ?`,
      propertySlug
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to track WhatsApp click:", error);
    return { success: false };
  }
}
