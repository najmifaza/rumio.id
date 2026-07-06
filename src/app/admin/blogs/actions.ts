"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanitizeBlogContent } from "@/lib/sanitize";
import { SaveBlogSchema } from "@/lib/schemas";

export async function deleteBlog(id: string) {
  try {
    await requireAdmin();

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
    await requireAdmin();

    const parsed = SaveBlogSchema.safeParse({
      title: formData.get("title")?.toString().trim(),
      category: formData.get("category")?.toString().trim(),
      content: formData.get("content")?.toString().trim(),
      author: formData.get("author")?.toString().trim(),
      slug: formData.get("slug")?.toString().trim() || undefined,
      featuredImage: formData.get("featuredImage")?.toString().trim() || undefined,
    });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return { success: false, error: message };
    }

    const { title, category, content, author, slug: customSlug, featuredImage: featuredImageInput } = parsed.data;

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

    const featuredImage = featuredImageInput || "/placeholder-image.jpg";

    const payload = {
      title,
      slug,
      category,
      content: sanitizeBlogContent(content),
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
