"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";

export async function submitInquiry(data: {
  type: string;
  name: string;
  phone: string;
  transactionType: string;
  propertyType: string;
  location: string;
  budgetOrPrice: string;
}) {
  try {
    // Rate limiting: max 5 per minute per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = formLimiter.check(`inquiry:${ip}`);
    if (!rateCheck.allowed) {
      return { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit." };
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        phone: data.phone,
        transactionType: data.transactionType,
        propertyType: data.propertyType,
        location: data.location,
        budgetOrPrice: data.budgetOrPrice,
        status: "NEW",
        details: ""
      },
    });
    
    revalidatePath("/admin", "layout");
    
    return { success: true, data: inquiry };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Gagal mengirim permintaan. Silakan coba lagi." };
  }
}

