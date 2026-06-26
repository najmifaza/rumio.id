"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveAddon } from "@/app/admin/pricing/actions";
import type { AddonPlan } from "@prisma/client";

export default function AddonForm({ initialData }: { initialData?: AddonPlan }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await saveAddon(formData, initialData?.id);

    if (res.success) {
      router.push("/admin/pricing");
    } else {
      alert(res.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
          {isEditing ? "Edit Addon" : "Tambah Addon Baru"}
        </h3>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">Nama Addon</label>
          <input
            required
            name="name"
            defaultValue={initialData?.name}
            placeholder="Misal: Foto Drone Tambahan"
            className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">Deskripsi Singkat</label>
          <textarea
            required
            name="description"
            defaultValue={initialData?.description}
            rows={3}
            placeholder="Deskripsi singkat tentang addon ini..."
            className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-700">Harga (Rp)</label>
            <input
              required
              type="number"
              name="price"
              defaultValue={initialData?.price}
              placeholder="Misal: 500000"
              className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-700">Sufiks Harga (Opsional)</label>
            <input
              name="priceSuffix"
              defaultValue={initialData?.priceSuffix || ""}
              placeholder="Misal: /bulan atau /foto"
              className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">URL Gambar/Ikon (Opsional)</label>
          <input
            name="imageUrl"
            defaultValue={initialData?.imageUrl || ""}
            placeholder="https://..."
            className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end sticky bottom-6 z-10">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/pricing")}
            className="h-12 px-6 rounded-xl font-bold text-slate-600"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#0B1528] hover:bg-[#1a2b4c] text-white h-12 px-8 rounded-xl font-bold shadow-md"
          >
            {loading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan Addon"}
          </Button>
        </div>
      </div>
    </form>
  );
}
