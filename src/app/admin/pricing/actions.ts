"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { SaveAddonSchema, SavePlanSchema } from "@/lib/schemas";
import { z } from "zod";

export async function saveAddon(formData: FormData, id?: string) {
  try {
    await requireAdmin();

    const parsed = SaveAddonSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      priceSuffix: formData.get("priceSuffix") || undefined,
      imageUrl: formData.get("imageUrl") || undefined,
    });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return { success: false, error: message };
    }

    const { name, description, price, priceSuffix, imageUrl } = parsed.data;

    const data = {
      name,
      description,
      price,
      priceSuffix: priceSuffix || null,
      imageUrl: imageUrl || null,
    };

    if (id) {
      await prisma.addonPlan.update({ where: { id }, data });
    } else {
      await prisma.addonPlan.create({ data });
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
    await requireAdmin();
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
    await requireAdmin();

    const parsed = SavePlanSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      icon: formData.get("icon") || undefined,
      isPopular: formData.get("isPopular") === "true",
      features: formData.get("features") || undefined,
    });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return { success: false, error: message };
    }

    const { name, description, price, icon, isPopular, features: featuresJson } = parsed.data;

    // Process features
    let featuresList: { text: string }[] = [];
    if (featuresJson) {
      try {
        const parsedJson = JSON.parse(featuresJson);
        const featureSchema = z.array(z.object({ text: z.string() }).passthrough());
        featuresList = featureSchema.parse(parsedJson);
      } catch (e) {
        return { success: false, error: "Format fitur tidak valid." };
      }
    }

    const data = {
      name,
      description,
      price,
      icon: icon || "Check",
      isPopular,
    };

    if (id) {
      // Update plan
      await prisma.pricingPlan.update({ where: { id }, data });

      const existingFeatures = await prisma.pricingFeature.findMany({ where: { planId: id } });
      const existingFeaturesMap = new Map(existingFeatures.map(f => [f.text, f]));
      
      // Menggunakan Prisma Transaction dan createMany untuk mencegah Data Orphan dan N+1 problem
      await prisma.$transaction([
        prisma.pricingFeature.deleteMany({ where: { planId: id } }),
        prisma.pricingFeature.createMany({
          data: featuresList.map((feat: any, i: number) => {
            const existing = existingFeaturesMap.get(feat.text);
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
      const created = await prisma.pricingPlan.create({ data });

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

