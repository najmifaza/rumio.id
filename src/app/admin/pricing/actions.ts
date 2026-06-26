"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveAddon(formData: FormData, id?: string) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const priceSuffix = formData.get("priceSuffix") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;

    if (!name || !description || !priceStr) {
      return { success: false, error: "Nama, deskripsi, dan harga wajib diisi." };
    }

    const price = parseFloat(priceStr.replace(/[^0-9.-]+/g,""));
    if (isNaN(price)) {
      return { success: false, error: "Format harga tidak valid." };
    }

    const data = {
      name,
      description,
      price,
      priceSuffix: priceSuffix || null,
      imageUrl: imageUrl || null,
    };

    if (id) {
      await prisma.addonPlan.update({
        where: { id },
        data,
      });
    } else {
      await prisma.addonPlan.create({
        data,
      });
    }

    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error: unknown) {
    console.error("[SAVE_ADDON_ERROR]", error);
    return { success: false, error: "Gagal menyimpan addon. Silakan coba lagi." };
  }
}

export async function deleteAddon(id: string) {
  try {
    await prisma.addonPlan.delete({
      where: { id },
    });
    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error: unknown) {
    console.error("[DELETE_ADDON_ERROR]", error);
    return { success: false, error: "Gagal menghapus addon." };
  }
}

export async function savePlan(formData: FormData, id?: string) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string;
    const icon = formData.get("icon") as string;
    const isPopular = formData.get("isPopular") === "true";
    const featuresJson = formData.get("features") as string;

    if (!name || !description || !priceStr) {
      return { success: false, error: "Semua kolom wajib diisi." };
    }

    const price = parseFloat(priceStr.replace(/[^0-9.-]+/g,""));
    
    // Process features
    const featuresList = featuresJson ? JSON.parse(featuresJson) : [];

    const data = {
      name,
      description,
      price,
      icon: icon || "Check",
      isPopular,
    };

    if (id) {
      // Update plan
      await prisma.pricingPlan.update({
        where: { id },
        data,
      });

      const existingFeatures = await prisma.pricingFeature.findMany({ where: { planId: id } });
      
      // Menggunakan Prisma Transaction dan createMany untuk mencegah Data Orphan dan N+1 problem
      await prisma.$transaction([
        prisma.pricingFeature.deleteMany({ where: { planId: id } }),
        prisma.pricingFeature.createMany({
          data: featuresList.map((feat: any, i: number) => {
            const existing = existingFeatures.find(e => e.text === feat.text);
            return {
              planId: id,
              text: feat.text,
              tableValues: existing ? (existing.tableValues as any) : [],
              sortOrder: i,
            };
          })
        })
      ]);

    } else {
      // Create new plan
      const created = await prisma.pricingPlan.create({
        data,
      });

      if (featuresList.length > 0) {
        await prisma.pricingFeature.createMany({
          data: featuresList.map((feat: any, i: number) => ({
            planId: created.id,
            text: feat.text,
            tableValues: [],
            sortOrder: i,
          }))
        });
      }
    }

    revalidatePath("/admin/pricing");
    return { success: true };
  } catch (error: unknown) {
    console.error("[SAVE_PLAN_ERROR]", error);
    return { success: false, error: "Gagal menyimpan paket harga. Terjadi kesalahan internal." };
  }
}

