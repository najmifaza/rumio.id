import AddonForm from "@/components/admin/AddonForm";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function NewAddonPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Harga & Paket", href: "/admin/pricing" },
          { label: "Tambah Addon" },
        ]}
      />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528]">Tambah Addon Baru</h1>
          <p className="text-slate-500 mt-1">
            Buat layanan tambahan baru untuk ditawarkan kepada pelanggan.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <AddonForm />
      </div>
    </div>
  );
}
