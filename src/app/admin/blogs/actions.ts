"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 🛡️ TODO: Implementasikan fungsi otorisasi di sini (contoh: requireAdmin())

export async function deleteBlog(id: string) {
  try {
    // await requireAdmin(); // 🔒 Aktifkan jika sistem Auth sudah siap

    if (!id || typeof id !== "string") {
      return { success: false, error: "ID Blog tidak valid." };
    }

    await prisma.blog.delete({
      where: { id },
    });
    
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: unknown) {
    console.error("[DELETE_BLOG_ERROR]", error);
    return { success: false, error: "Gagal menghapus blog. Silakan coba lagi." };
  }
}

export async function saveBlog(formData: FormData, id?: string) {
  try {
    // await requireAdmin(); // 🔒 Aktifkan jika sistem Auth sudah siap

    const title = formData.get("title")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    const author = formData.get("author")?.toString().trim();

    if (!title || !category || !content || !author) {
      return { success: false, error: "Semua kolom wajib (Judul, Kategori, Konten, Penulis) harus diisi." };
    }

    const customSlug = formData.get("slug")?.toString().trim();
    let slug = customSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    const existingSlug = await prisma.blog.findFirst({
      where: {
        slug,
        ...(id ? { id: { not: id } } : {}),
      },
      select: { id: true }, // Optimasi performa
    });

    if (existingSlug) {
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      slug = `${slug}-${randomSuffix}`;
    }

    const featuredImageInput = formData.get("featuredImage")?.toString().trim();
    const featuredImage = featuredImageInput || "/placeholder-image.jpg";

    const payload = {
      title,
      slug,
      category,
      content,
      author,
      featuredImage,
    };

    if (id) {
      await prisma.blog.update({
        where: { id },
        data: payload,
      });
    } else {
      await prisma.blog.create({
        data: payload,
      });
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: unknown) {
    console.error("[SAVE_BLOG_ERROR]", error);
    return { success: false, error: "Terjadi kesalahan internal saat menyimpan blog." };
  }
}
