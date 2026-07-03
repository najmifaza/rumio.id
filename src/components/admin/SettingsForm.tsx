"use client";

import { useState } from "react";
import { saveSettings } from "@/app/admin/settings/actions";
import { Button } from "@/components/ui/button";
import { Save, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import MediaPickerModal from "./MediaPickerModal";
import { useToast } from "@/components/ui/Toast";

export type SettingField = {
  key: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "tel" | "image";
  placeholder?: string;
  helpText?: string;
};

type Props = {
  title: string;
  description: string;
  fields: SettingField[];
  initialData: Record<string, string>;
};

export default function SettingsForm({ title, description, fields, initialData }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeMediaPicker, setActiveMediaPicker] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const data: Record<string, string> = {};
    fields.forEach(f => {
      data[f.key] = initialData[f.key] || "";
    });
    return data;
  });

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await saveSettings(formData);
    setLoading(false);
    
    if (res.success) {
      showToast("Pengaturan berhasil disimpan!", "success");
      router.refresh();
    } else {
      showToast(`Gagal menyimpan: ${res.error}`, "error");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0B1528] mb-1">{title}</h1>
        <p className="text-slate-500 font-medium">{description}</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(field => (
            <div key={field.key} className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                {field.label}
              </label>
              {field.type === "image" ? (
                <div className="relative group">
                  <div
                    onClick={() => setActiveMediaPicker(field.key)}
                    className={`w-full cursor-pointer relative overflow-hidden transition-all ${
                      formData[field.key]
                        ? "border border-slate-200 rounded-xl group-hover:border-amber-400 group-hover:ring-2 group-hover:ring-amber-400/20 shadow-sm h-48"
                        : "py-6 px-4 border-2 border-slate-200 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 group-hover:bg-amber-50 group-hover:border-amber-300 text-center"
                    }`}
                  >
                    {formData[field.key] ? (
                      <div className="relative w-full h-full bg-slate-100 flex items-center justify-center">
                        <img
                          src={formData[field.key]}
                          alt={field.label}
                          className="max-h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-bold flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" /> Ganti Gambar
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-amber-500 mb-2" />
                        <span className="text-[14px] font-bold text-slate-600 group-hover:text-amber-700">
                          Pilih Gambar
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full p-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none placeholder:text-slate-400"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-400"
                />
              )}
              {field.helpText && (
                <p className="text-[11px] text-slate-500">{field.helpText}</p>
              )}
            </div>
          ))}

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white h-11 px-8 rounded-xl font-bold shadow-md flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? "Menyimpan..." : "Simpan Pengaturan"}
            </Button>
          </div>
        </form>
      </div>

      <MediaPickerModal
        isOpen={!!activeMediaPicker}
        onClose={() => setActiveMediaPicker(null)}
        onSelect={(assets) => {
          if (assets.length > 0 && activeMediaPicker) {
            handleChange(activeMediaPicker, assets[0].url);
          }
        }}
        multiple={false}
      />
    </div>
  );
}
