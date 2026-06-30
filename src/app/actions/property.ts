"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { viewLimiter } from "@/lib/rate-limit";

export async function trackWhatsAppClick(propertySlug: string) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = viewLimiter.check(`wa_click:${ip}:${propertySlug}`);
    
    if (!rateCheck.allowed) {
      return { success: false, error: "Too many requests" };
    }

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
