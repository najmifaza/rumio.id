"use server";

import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export async function submitPackageOrder(formData: FormData) {
  try {
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

    if (!file) {
      return { success: false, error: "Bukti pembayaran wajib diunggah." };
    }

    // Process file upload
    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    let originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    
    // Optimize image if it's an image
    if (file.type.startsWith('image/') && !file.type.includes('svg')) {
      buffer = (await sharp(buffer).webp({ quality: 80 }).toBuffer()) as Buffer;
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
    await prisma.packageOrder.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete order" };
  }
}
