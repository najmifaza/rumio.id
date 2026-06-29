"use server";

import { prisma } from "@/lib/prisma";

export async function trackWhatsAppClick(propertySlug: string) {
  try {
    await prisma.property.update({
      where: { slug: propertySlug },
      data: { whatsappClicks: { increment: 1 } },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to track WhatsApp click:", error);
    return { success: false };
  }
}
