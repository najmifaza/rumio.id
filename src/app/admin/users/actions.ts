"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Helper: pastikan hanya ADMIN utama yang bisa akses
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Akses ditolak. Hanya Admin Utama yang dapat melakukan tindakan ini.");
  }
  return session;
}

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

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "OWNER";

  if (!name || !email || !password) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Email ini sudah digunakan." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role as "ADMIN" | "OWNER" },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

// Reset password user
export async function resetUserPassword(userId: string, newPassword: string) {
  await requireAdmin();

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "Password minimal 6 karakter." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
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
