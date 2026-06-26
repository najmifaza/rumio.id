import PricingPlanForm from "@/components/admin/PricingPlanForm";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function NewPricingPlanPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Harga & Paket", href: "/admin/pricing" },
          { label: "Tambah Paket Baru" },
        ]}
      />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528]">Tambah Paket Berlangganan</h1>
          <p className="text-slate-500 mt-1">
            Buat paket berlangganan baru dengan daftar fitur yang menarik.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <PricingPlanForm />
      </div>
    </div>
  );
}
