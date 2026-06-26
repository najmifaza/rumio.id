import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddonForm from "@/components/admin/AddonForm";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default async function EditAddonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const addon = await prisma.addonPlan.findUnique({
    where: { id },
  });

  if (!addon) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Harga & Paket", href: "/admin/pricing" },
          { label: "Edit Addon" },
        ]}
      />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528]">Edit Addon</h1>
          <p className="text-slate-500 mt-1">
            Perbarui informasi layanan tambahan "{addon.name}".
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <AddonForm initialData={addon} />
      </div>
    </div>
  );
}
