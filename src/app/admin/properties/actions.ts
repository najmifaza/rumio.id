"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({
      where: { id },
    });
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
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const uploadDir = join(process.cwd(), 'public/uploads');
  // ISS-14 FIX: Hanya abaikan error EEXIST (folder sudah ada), lempar ulang error lain
  try { 
    await mkdir(uploadDir, { recursive: true }); 
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e;
  }

  const path = join(uploadDir, fileName);
  await writeFile(path, buffer);
  return `/uploads/${fileName}`;
}

export async function saveProperty(formData: FormData, id?: string) {
  try {
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

    const title = formData.get("title") as string;
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    // ISS-03 FIX: Loop deterministik — coba slug-1, slug-2, dst. sampai ditemukan yang benar-benar unik.
    const baseSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await prisma.property.findUnique({ where: { slug } });
      // Tidak ada konflik, atau konflik dengan properti yang sedang diedit — slug aman dipakai
      if (!existing || existing.id === id) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Process Highlights
    const highlightsStr = formData.get("highlights") as string;
    let highlights = null;
    if (highlightsStr) {
      try { highlights = JSON.parse(highlightsStr); } catch {}
    }

    const virtualTourDataJson = formData.get("virtualTourDataJson") as string;
    
    type VirtualTourNode = { id: string; panorama: string; [key: string]: unknown };
    type VirtualTourParsed = { nodes?: VirtualTourNode[]; [key: string]: unknown };
    
    let virtualTourData: any = Prisma.JsonNull; // Gunakan Prisma.JsonNull agar Prisma menghapusnya dari DB jika kosong
    
    if (virtualTourDataJson) {
      try { 
        const parsed = JSON.parse(virtualTourDataJson) as VirtualTourParsed;
        if (parsed && Array.isArray(parsed.nodes)) {
          for (const node of parsed.nodes) {
            const vtFile = formData.get(`vtFile_${node.id}`) as File | null;
            if (vtFile && vtFile.size > 0) {
              const uploadedVtPath = await handleImageUpload(vtFile);
              if (uploadedVtPath) {
                node.panorama = uploadedVtPath;
              }
            }
          }
        }
        virtualTourData = parsed as Prisma.InputJsonValue;
      } catch (e) {
        console.error("Gagal parse VT JSON", e);
      }
    }

    const data = {
      title,
      slug,
      price: parseFloat(formData.get("price") as string),
      location: formData.get("location") as string,
      propertyType: formData.get("propertyType") as string,
      listingType: formData.get("listingType") as string,
      condition: formData.get("condition") as string,
      bedrooms: parseInt(formData.get("bedrooms") as string),
      bathrooms: parseInt(formData.get("bathrooms") as string),
      floors: parseInt(formData.get("floors") as string),
      landArea: parseFloat(formData.get("landArea") as string),
      buildingArea: parseFloat(formData.get("buildingArea") as string),
      electricity: parseInt(formData.get("electricity") as string),
      waterSupply: formData.get("waterSupply") as string,
      facing: formData.get("facing") as string,
      buildYear: parseInt(formData.get("buildYear") as string),
      certificate: formData.get("certificate") as string,
      description: formData.get("description") as string,
      mapsUrl: formData.get("mapsUrl") as string,
      status: (formData.get("status") as string) || "AVAILABLE",
      featuredImage,
      highlights,
      virtualTourData,
    };

    if (id) {
      // Update existing
      await prisma.property.update({ where: { id }, data });
      
      // ISS-01 FIX: Hapus SEMUA gambar lama sebelum insert batch baru.
      // Tanpa ini, setiap kali admin menyimpan, gambar berlipat ganda di DB.
      await prisma.propertyImage.deleteMany({ where: { propertyId: id } });
      await prisma.propertyImage.createMany({
        data: finalImages.map(img => ({
          propertyId: id,
          imageUrl: img.url,
          caption: img.caption,
        })),
      });
    } else {
      // ISS-04 FIX: Pindahkan query admin ke dalam blok create saja — tidak perlu dipanggil saat update.
      const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!admin) throw new Error("Admin not found");

      // Create new
      const newProperty = await prisma.property.create({ 
        data: { ...data, ownerId: admin.id } 
      });
      
      await prisma.propertyImage.createMany({
        data: finalImages.map(img => ({
          propertyId: newProperty.id,
          imageUrl: img.url,
          caption: img.caption,
        })),
      });
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
