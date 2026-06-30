"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function deleteInquiry(id: string) {
  try {
    await requireAdmin();
    await prisma.inquiry.delete({
      where: { id },
    });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    await requireAdmin();
    
    const validStatuses = ["NEW", "CONTACTED", "DONE"];
    if (!validStatuses.includes(status)) {
      return { success: false, error: "Status tidak valid" };
    }

    await prisma.inquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to update inquiry status:", error);
    return { success: false, error: "Gagal mengubah status" };
  }
}
