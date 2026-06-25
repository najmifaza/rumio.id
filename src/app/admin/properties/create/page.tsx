import PropertyForm from "@/components/admin/PropertyForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreatePropertyPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/properties" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0B1528] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Properti
        </Link>
        <h1 className="text-3xl font-black text-[#0B1528] mb-1">Tambah Properti Baru</h1>
        <p className="text-slate-500 font-medium">Lengkapi detail form di bawah untuk mempublikasikan properti.</p>
      </div>

      <PropertyForm />
    </div>
  );
}
