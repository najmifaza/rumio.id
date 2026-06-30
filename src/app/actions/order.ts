"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";

export async function submitPackageOrder(formData: FormData) {
  try {
    // Rate limiting: max 5 per minute per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = formLimiter.check(`order:${ip}`);
    if (!rateCheck.allowed) {
      return { success: false, error: "Terlalu banyak permintaan. Silakan coba lagi nanti." };
    }

    const planId = formData.get("planId") as string;
    const planName = formData.get("planName") as string;
    const customerName = formData.get("customerName") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const propertyType = formData.get("propertyType") as string;
    const location = formData.get("location") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const totalPrice = parseFloat(formData.get("totalPrice") as string);
    const addonsJson = formData.get("addons") as string;
    const file = formData.get("proofOfPayment") as File;

    if (!file || file.size === 0) {
      return { success: false, error: "Bukti pembayaran wajib diunggah." };
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "Ukuran file maksimal 10MB." };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: "Format file tidak didukung. Harap unggah gambar (JPG, PNG, WEBP)." };
    }

    // Process file upload
    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    let originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    
    // Optimize image if it's an image
    if (file.type.startsWith('image/') && !file.type.includes('svg')) {
      buffer = (await sharp(buffer).webp({ quality: 80 }).toBuffer()) as any;
      originalName = originalName.replace(/\.[^/.]+$/, "") + ".webp";
    }

    const fileName = `${uniqueSuffix}-${originalName}`;
    const uploadDir = join(process.cwd(), "public/uploads/payments");
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e: any) {
      if (e.code !== "EEXIST") throw e;
    }

    const path = join(uploadDir, fileName);
    await writeFile(path, buffer);
    const proofUrl = `/uploads/payments/${fileName}`;

    // Parse addons
    let addons = [];
    try {
      if (addonsJson) addons = JSON.parse(addonsJson);
    } catch (e) {
      console.error("Failed to parse addons", e);
    }

    // Save to DB
    const order = await prisma.packageOrder.create({
      data: {
        planId,
        planName,
        customerName,
        whatsapp,
        propertyType,
        location,
        paymentMethod,
        totalPrice,
        proofUrl,
        addons,
      }
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order submission failed:", error);
    return { success: false, error: "Terjadi kesalahan saat memproses pesanan." };
  }
}

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
