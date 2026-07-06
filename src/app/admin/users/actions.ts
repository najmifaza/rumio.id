"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { CreateUserSchema, ResetPasswordSchema } from "@/lib/schemas";

// Ambil semua user (ADMIN & OWNER)
export async function getUsers() {
  await requireAdmin();
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { properties: true } },
    },
  });
}

// Buat user baru (Admin Properti / OWNER)
export async function createUser(formData: FormData) {
  await requireAdmin();

  const parsed = CreateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") || "OWNER",
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
    return { success: false, error: message };
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Email ini sudah digunakan." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

// Reset password user
export async function resetUserPassword(userId: string, newPassword: string) {
  await requireAdmin();

  const parsed = ResetPasswordSchema.safeParse({ newPassword });
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Input tidak valid.";
    return { success: false, error: message };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

// Hapus user (tidak bisa hapus diri sendiri)
export async function deleteUser(userId: string) {
  const session = await requireAdmin();

  if (userId === session.user.id) {
    return { success: false, error: "Tidak dapat menghapus akun Anda sendiri." };
  }

  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
  return { success: true };
}
