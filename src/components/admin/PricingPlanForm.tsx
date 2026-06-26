"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { savePlan } from "@/app/admin/pricing/actions";
import type { PricingPlan, PricingFeature } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";

type PlanWithFeatures = PricingPlan & { features: PricingFeature[] };

export default function PricingPlanForm({ initialData }: { initialData?: PlanWithFeatures }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;
  
  // Manage features dynamically
  const [features, setFeatures] = useState<{ id: string, text: string }[]>(
    initialData?.features.map(f => ({ id: f.id, text: f.text })) || []
  );

  const addFeature = () => {
    setFeatures([...features, { id: Math.random().toString(), text: "" }]);
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const updateFeatureText = (id: string, text: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, text } : f));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("features", JSON.stringify(features.filter(f => f.text.trim() !== "")));

    const res = await savePlan(formData, initialData?.id);

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
          {isEditing ? "Edit Paket" : "Tambah Paket Baru"}
        </h3>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">Nama Paket</label>
          <input
            required
            name="name"
            defaultValue={initialData?.name}
            placeholder="Misal: Starter"
            className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">Deskripsi Singkat</label>
          <textarea
            required
            name="description"
            defaultValue={initialData?.description}
            rows={2}
            placeholder="Deskripsi untuk siapa paket ini cocok..."
            className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-700">Harga (Rp / bulan)</label>
            <input
              required
              type="number"
              name="price"
              defaultValue={initialData?.price}
              placeholder="Misal: 1500000"
              className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-700">Ikon Lucide (Opsional)</label>
            <input
              name="icon"
              defaultValue={initialData?.icon || "Check"}
              placeholder="Misal: Send, Crown, Gem"
              className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 mb-2 bg-amber-50 border border-amber-100 p-4 rounded-xl">
          <input
            type="checkbox"
            name="isPopular"
            value="true"
            defaultChecked={initialData?.isPopular}
            id="isPopular"
            className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
          />
          <label htmlFor="isPopular" className="text-sm font-bold text-amber-900 cursor-pointer">
            Tandai sebagai Paket Populer (Sorotan)
          </label>
        </div>

        {/* Features Builder */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-700">Daftar Fitur</h4>
              <p className="text-xs text-slate-500">Fitur yang muncul sebagai list dengan icon centang.</p>
            </div>
            <Button
              type="button"
              onClick={addFeature}
              className="h-9 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs rounded-lg"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Tambah Fitur
            </Button>
          </div>

          <div className="space-y-3">
            {features.map((feat, index) => (
              <div key={feat.id} className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                  {index + 1}
                </div>
                <input
                  required
                  value={feat.text}
                  onChange={(e) => updateFeatureText(feat.id, e.target.value)}
                  placeholder="Misal: 15 Foto Properti Profesional"
                  className="flex-1 h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(feat.id)}
                  className="w-11 h-11 flex items-center justify-center border border-red-200 text-red-500 hover:bg-red-50 rounded-xl shrink-0 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {features.length === 0 && (
              <div className="text-center py-6 text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
                Belum ada fitur. Klik "Tambah Fitur" untuk memulai.
              </div>
            )}
          </div>
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
            {loading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan Paket"}
          </Button>
        </div>
      </div>
    </form>
  );
}
