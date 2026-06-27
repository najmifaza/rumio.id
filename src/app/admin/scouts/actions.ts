"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateScoutStatus(id: string, status: string) {
  try {
    await prisma.propertyScout.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/scouts");
    return { success: true };
  } catch (error) {
    console.error("Gagal update status scout:", error);
    return { success: false, error: "Gagal update status" };
  }
}

export async function deleteScout(id: string) {
  try {
    await prisma.propertyScout.delete({
      where: { id },
    });
    revalidatePath("/admin/scouts");
    return { success: true };
  } catch (error) {
    console.error("Gagal hapus scout:", error);
    return { success: false, error: "Gagal menghapus pendaftaran" };
  }
}
