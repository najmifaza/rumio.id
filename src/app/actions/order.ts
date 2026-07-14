"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { unlink } from "fs/promises";
import { join } from "path";

export async function updateOrderStatus(id: string, status: string) {
  try {
    await requireAdmin();

    const VALID_STATUSES = ["PENDING", "CONFIRMED", "REJECTED"];
    if (!VALID_STATUSES.includes(status)) {
      return { success: false, error: "Status tidak valid" };
    }

    await prisma.packageOrder.update({
      where: { id },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteOrder(id: string) {
  try {
    await requireAdmin();

    const order = await prisma.packageOrder.findUnique({ where: { id } });
    if (order?.proofUrl) {
      const filePath = join(process.cwd(), "public", order.proofUrl);
      try { await unlink(filePath); } catch (e) { console.error("Failed to delete order proof:", e); }
    }

    await prisma.packageOrder.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete order" };
  }
}
