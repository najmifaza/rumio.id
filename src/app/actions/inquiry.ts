"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
