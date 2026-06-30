"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import { requireAdmin } from "@/lib/auth";


export async function uploadMedia(formData: FormData) {
  try {
    await requireAdmin();
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "Tidak ada file yang diunggah" };
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4'];

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "Ukuran file maksimal 10MB" };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: "Format file tidak didukung" };
    }

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);
    
    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    let originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    let mimeType = file.type;
    let size = file.size;

    if (file.type.startsWith('image/') && !file.type.includes('svg')) {
      buffer = (await sharp(buffer).webp({ quality: 80 }).toBuffer()) as any;
      originalName = originalName.replace(/\.[^/.]+$/, "") + ".webp";
      mimeType = 'image/webp';
      size = buffer.length;
    }
    
    const fileName = `${uniqueSuffix}-${originalName}`;
    
    const uploadDir = join(process.cwd(), "public/uploads/media");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e: unknown) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    }

    const path = join(uploadDir, fileName);
    await writeFile(path, buffer);
    const url = `/uploads/media/${fileName}`;

    // Save to DB
    const asset = await prisma.mediaAsset.create({
      data: {
        filename: originalName,
        url,
        mimeType,
        size,
      }
    });

    revalidatePath("/admin/media");
    return { success: true, asset };
  } catch (error: unknown) {
    console.error("Failed to upload media:", error);
    return { success: false, error: "Gagal mengunggah file" };
  }
}

export async function deleteMedia(id: string) {
  try {
    await requireAdmin();
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) return { success: false, error: "File tidak ditemukan" };

    // Delete from filesystem
    const filePath = join(process.cwd(), "public", asset.url);
    try {
      await unlink(filePath);
    } catch {
      console.warn("File already deleted from disk or not found:", filePath);
    }

    // Delete from DB
    await prisma.mediaAsset.delete({ where: { id } });

    revalidatePath("/admin/media");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to delete media:", error);
    return { success: false, error: "Gagal menghapus file" };
  }
}

export async function getMediaAssets() {
  try {
    await requireAdmin();
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, assets };
  } catch {
    return { success: false, error: "Gagal mengambil aset media" };
  }
}
