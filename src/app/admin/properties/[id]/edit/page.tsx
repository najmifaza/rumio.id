import PropertyForm from "@/components/admin/PropertyForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  // Hanya ADMIN yang boleh edit properti
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin/properties");
  }

  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!property) {
    notFound();
  }

  // Ambil semua OWNER untuk dropdown assign
  const owners = await prisma.user.findMany({
    where: { role: "OWNER" },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/properties" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0B1528] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Properti
        </Link>
        <h1 className="text-3xl font-black text-[#0B1528] mb-1">Edit Properti</h1>
        <p className="text-slate-500 font-medium">Perbarui informasi untuk properti {property.title}</p>
      </div>

      <PropertyForm initialData={property} owners={owners} />
    </div>
  );
}
