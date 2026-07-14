"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import { join } from "path";
import { processAndSaveImage } from "@/lib/upload";
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

    const uploadResult = await processAndSaveImage(file, "media");

    // Save to DB
    const asset = await prisma.mediaAsset.create({
      data: {
        filename: uploadResult.fileName,
        url: uploadResult.url,
        mimeType: uploadResult.mimeType,
        size: uploadResult.size
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
