"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete blog:", error);
    return { success: false, error: "Gagal menghapus blog" };
  }
}

async function handleImageUpload(file: File | null) {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const uploadDir = join(process.cwd(), "public/uploads/blog");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
  }

  const path = join(uploadDir, fileName);
  await writeFile(path, buffer);
  return `/uploads/blog/${fileName}`;
}

export async function saveBlog(formData: FormData, id?: string) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;

    if (!title || !content || !author) {
      return { success: false, error: "Judul, konten, dan penulis harus diisi." };
    }

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const existingSlug = await prisma.blog.findFirst({
      where: {
        slug,
        ...(id ? { id: { not: id } } : {}),
      },
    });

    if (existingSlug) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const file = formData.get("featuredImageFile") as File | null;
    const existingFeaturedImage = formData.get("existingFeaturedImage") as string;

    let featuredImage = existingFeaturedImage || "/placeholder-image.jpg";
    if (file && file.size > 0) {
      const uploadedPath = await handleImageUpload(file);
      if (uploadedPath) {
        featuredImage = uploadedPath;
      }
    }

    const data = {
      title,
      slug,
      content,
      author,
      featuredImage,
    };

    if (id) {
      await prisma.blog.update({
        where: { id },
        data,
      });
    } else {
      await prisma.blog.create({
        data,
      });
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save blog:", error);
    return { success: false, error: error.message || "Gagal menyimpan blog" };
  }
}
