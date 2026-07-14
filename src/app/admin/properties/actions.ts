"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { unlink } from 'fs/promises';
import { join } from 'path';
import { processAndSaveImage } from '@/lib/upload';
import { getServerSession } from "next-auth";
import { authOptions, requireAdmin } from "@/lib/auth";
import { SavePropertySchema } from "@/lib/schemas";
import { z } from "zod";

export async function deleteProperty(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const property = await prisma.property.findUnique({ 
      where: { id },
      include: { images: true }
    });

    if (!property) return { success: false, error: "Properti tidak ditemukan" };

    // Cek kepemilikan jika bukan Admin Utama
    if (session.user.role !== "ADMIN") {
      if (property.ownerId !== session.user.id) {
        return { success: false, error: "Anda tidak memiliki izin untuk menghapus properti ini." };
      }
    }

    // Hapus file fisik
    const filesToDelete = [...property.images.map(img => img.imageUrl)];
    if (property.featuredImage && !filesToDelete.includes(property.featuredImage)) {
      filesToDelete.push(property.featuredImage);
    }
    
    for (const url of filesToDelete) {
      if (url.startsWith("/uploads/")) {
        const filePath = join(process.cwd(), "public", url);
        try { await unlink(filePath); } catch (e) {}
      }
    }

    await prisma.property.delete({ where: { id } });
    revalidatePath("/admin/properties");
    revalidatePath("/properti");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete property:", error);
    return { success: false, error: "Gagal menghapus properti" };
  }
}


async function handleImageUpload(file: File | null) {
  if (!file || file.size === 0) return null;
  
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Ukuran file maksimal 10MB');
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Tipe file tidak diizinkan');
  }

  const result = await processAndSaveImage(file);
  return result.url;
}

export async function saveProperty(formData: FormData, id?: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    if (id && session.user.role !== "ADMIN") {
      const existingProp = await prisma.property.findUnique({ where: { id }, select: { ownerId: true } });
      if (existingProp?.ownerId !== session.user.id) {
        return { success: false, error: "Anda tidak memiliki izin untuk mengubah properti ini." };
      }
    }

    // Handle multiple images
    const imageCount = parseInt(formData.get("imageCount") as string) || 0;
    const finalImages: { url: string; caption: string | null }[] = [];
    let featuredImage = "";

    for (let i = 0; i < imageCount; i++) {
      const url = formData.get(`imageUrl_${i}`) as string;
      const caption = formData.get(`imageCaption_${i}`) as string | null;
      const isFeatured = formData.get(`isFeatured_${i}`) === 'true';

      // ISS-02 FIX: Gunakan allow-list eksplisit
      if (url && (url.startsWith("/uploads/") || url.startsWith("https://"))) {
        finalImages.push({ url, caption });
        if (isFeatured) {
          featuredImage = url;
        }
      }
    }

    if (finalImages.length < 3) {
      return { success: false, error: "Minimal 3 gambar harus diisi/diupload." };
    }

    if (!featuredImage) {
      featuredImage = finalImages[0].url;
    }

    // ─── Validate core property fields with Zod ───────────────────────
    const rawProperty = {
      title: formData.get("title"),
      price: formData.get("price"),
      location: formData.get("location"),
      propertyType: formData.get("propertyType"),
      listingType: formData.get("listingType"),
      condition: formData.get("condition") || undefined,
      bedrooms: formData.get("bedrooms"),
      bathrooms: formData.get("bathrooms"),
      floors: formData.get("floors"),
      landArea: formData.get("landArea"),
      buildingArea: formData.get("buildingArea"),
      electricity: formData.get("electricity"),
      waterSupply: formData.get("waterSupply") || undefined,
      facing: formData.get("facing") || undefined,
      buildYear: formData.get("buildYear"),
      certificate: formData.get("certificate") || undefined,
      description: formData.get("description"),
      mapsUrl: formData.get("mapsUrl") || undefined,
      status: (formData.get("status") as string) || "AVAILABLE",
    };

    const parsedProperty = SavePropertySchema.safeParse(rawProperty);
    if (!parsedProperty.success) {
      const message = parsedProperty.error.issues[0]?.message ?? "Input properti tidak valid.";
      return { success: false, error: message };
    }

    const validatedFields = parsedProperty.data;
    const title = validatedFields.title;
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    // ISS-03 FIX: Loop deterministik — coba slug-1, slug-2, dst. sampai ditemukan yang benar-benar unik.
    const baseSlug = slug;
    let counter = 1;
    while (true) {
      if (counter > 100) throw new Error("Gagal membuat slug unik setelah 100 percobaan");
      const existing = await prisma.property.findUnique({ where: { slug } });
      // Tidak ada konflik, atau konflik dengan properti yang sedang diedit — slug aman dipakai
      if (!existing || existing.id === id) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Process Highlights
    const highlightsStr = formData.get("highlights") as string;
    let highlights: any = Prisma.JsonNull;
    if (highlightsStr) {
      try { 
        const parsed = JSON.parse(highlightsStr);
        highlights = z.array(z.string()).parse(parsed);
      } catch {
        return { success: false, error: "Format highlights tidak valid." };
      }
    }

    const virtualTourDataJson = formData.get("virtualTourDataJson") as string;
    
    let virtualTourData: any = Prisma.JsonNull; // Gunakan Prisma.JsonNull agar Prisma menghapusnya dari DB jika kosong
    
    if (virtualTourDataJson) {
      try { 
        const parsed = JSON.parse(virtualTourDataJson);
        const VirtualTourSchema = z.object({
          nodes: z.array(z.object({
            id: z.string(),
            panorama: z.string().optional()
          }).passthrough()).optional()
        }).passthrough();
        
        const validated = VirtualTourSchema.parse(parsed);
        if (validated && Array.isArray(validated.nodes)) {
          for (const node of validated.nodes) {
            const vtFile = formData.get(`vtFile_${node.id}`) as File | null;
            if (vtFile && vtFile.size > 0) {
              const uploadedVtPath = await handleImageUpload(vtFile);
              if (uploadedVtPath) {
                node.panorama = uploadedVtPath;
              }
            }
          }
        }
        virtualTourData = validated as Prisma.InputJsonValue;
      } catch (e) {
        console.error("Gagal parse VT JSON", e);
        return { success: false, error: "Format Virtual Tour tidak valid." };
      }
    }

    const data = {
      title,
      slug,
      price: validatedFields.price,
      location: validatedFields.location,
      propertyType: validatedFields.propertyType,
      listingType: validatedFields.listingType,
      condition: validatedFields.condition,
      bedrooms: validatedFields.bedrooms,
      bathrooms: validatedFields.bathrooms,
      floors: validatedFields.floors,
      landArea: validatedFields.landArea,
      buildingArea: validatedFields.buildingArea,
      electricity: validatedFields.electricity,
      waterSupply: validatedFields.waterSupply,
      facing: validatedFields.facing,
      buildYear: validatedFields.buildYear,
      certificate: validatedFields.certificate,
      description: validatedFields.description,
      mapsUrl: validatedFields.mapsUrl,
      status: validatedFields.status,
      featuredImage,
      highlights,
      virtualTourData,
    };

    if (id) {
      // Update existing — termasuk update ownerId jika ADMIN mengubah assignment
      let updateData: any = { ...data };
      if (session.user.role === "ADMIN") {
        const formOwnerId = formData.get("ownerId") as string | null;
        if (formOwnerId) updateData.ownerId = formOwnerId;
      }

      const performUpdate = (slugToUse: string) => 
        prisma.property.update({
          where: { id },
          data: {
            ...updateData,
            slug: slugToUse,
            images: {
              deleteMany: {},
              create: finalImages.map(img => ({ imageUrl: img.url, caption: img.caption }))
            }
          }
        });

      try {
        await performUpdate(updateData.slug);
      } catch (e: any) {
        if (e.code === 'P2002') {
          await performUpdate(`${updateData.slug}-${Date.now()}`);
        } else {
          throw e;
        }
      }
    } else {
      // ownerId dari pilihan dropdown (hanya admin); fallback ke session.user.id
      let formOwnerId = session.user.id;
      if (session.user.role === "ADMIN") {
        formOwnerId = (formData.get("ownerId") as string) || session.user.id;
      }

      const performCreate = (slugToUse: string) => 
        prisma.property.create({
          data: {
            ...data,
            ownerId: formOwnerId,
            slug: slugToUse,
            images: {
              create: finalImages.map(img => ({ imageUrl: img.url, caption: img.caption }))
            }
          }
        });

      try {
        await performCreate(data.slug);
      } catch (e: any) {
        if (e.code === 'P2002') {
          await performCreate(`${data.slug}-${Date.now()}`);
        } else {
          throw e;
        }
      }
    }

    revalidatePath("/admin/properties", "layout");
    revalidatePath("/properti", "layout");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to save property:", error);
    return { success: false, error: "Gagal menyimpan properti" };
  }
}
