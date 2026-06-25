"use server";

import { prisma } from "@/lib/prisma";
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
  try { await mkdir(uploadDir, { recursive: true }); } catch (e) {}

  const path = join(uploadDir, fileName);
  await writeFile(path, buffer);
  return `/uploads/${fileName}`;
}

export async function saveProperty(formData: FormData, id?: string) {
  try {
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!admin) throw new Error("Admin not found");

    // Handle multiple images
    const imageCount = parseInt(formData.get("imageCount") as string) || 0;
    const finalImages: { url: string; caption: string | null }[] = [];
    let featuredImage = "";

    for (let i = 0; i < imageCount; i++) {
      const file = formData.get(`imageFile_${i}`) as File | null;
      const url = formData.get(`imageUrl_${i}`) as string;
      const caption = formData.get(`imageCaption_${i}`) as string | null;
      const isFeatured = formData.get(`isFeatured_${i}`) === 'true';

      let finalUrl = url;
      if (file && file.size > 0) {
        const uploadedPath = await handleImageUpload(file);
        if (uploadedPath) finalUrl = uploadedPath;
      }
      
      if (finalUrl && !finalUrl.startsWith("blob:")) {
        finalImages.push({ url: finalUrl, caption });
        if (isFeatured) {
          featuredImage = finalUrl;
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
    
    // Check for slug uniqueness
    const existingProp = await prisma.property.findUnique({ where: { slug } });
    if (existingProp && existingProp.id !== id) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
    }
    
    // Process Highlights
    const highlightsStr = formData.get("highlights") as string;
    let highlights = null;
    if (highlightsStr) {
      try { highlights = JSON.parse(highlightsStr); } catch (e) {}
    }

    const virtualTourDataJson = formData.get("virtualTourDataJson") as string;
    let virtualTourData = undefined;
    if (virtualTourDataJson) {
      try { 
        const parsed = JSON.parse(virtualTourDataJson);
        if (parsed && parsed.nodes) {
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
        virtualTourData = parsed;
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
      featuredImage,
      highlights,
      virtualTourData,
    };

    if (id) {
      // Update existing
      await prisma.property.update({ where: { id }, data });
      
      // PERF-1 FIX: Ganti N+1 loop dengan createMany() — 1 query untuk semua gambar
      await prisma.propertyImage.createMany({
        data: finalImages.map(img => ({
          propertyId: id,
          imageUrl: img.url,
          caption: img.caption,
        })),
      });
    } else {
      // Create new
      const newProperty = await prisma.property.create({ 
        data: { ...data, ownerId: admin.id } 
      });
      
      // PERF-1 FIX: Ganti N+1 loop dengan createMany() — 1 query untuk semua gambar
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
