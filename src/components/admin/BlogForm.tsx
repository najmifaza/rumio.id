"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveBlog } from "@/app/admin/blogs/actions";
import type { Blog } from "@prisma/client";
import dynamic from "next/dynamic";
import MediaPickerModal from "./MediaPickerModal";
import { Image as ImageIcon } from "lucide-react";

const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
      Memuat editor...
    </div>
  ),
});

export default function BlogForm({ initialData }: { initialData?: Blog }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(initialData?.content || "");
  const [imagePreview, setImagePreview] = useState(
    initialData?.featuredImage || "",
  );
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const isEditing = !!initialData;
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isCustomSlug, setIsCustomSlug] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isCustomSlug && !isEditing) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsCustomSlug(true);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("content", content); // Add content manually from state
    const res = await saveBlog(formData, initialData?.id);

    if (res.success) {
      router.push("/admin/blogs");
    } else {
      alert(res.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B1528]">
                {isEditing ? "Edit Artikel" : "Tulis Artikel Baru"}
              </h3>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                Gambar Utama
              </label>
              <div className="relative group mt-2">
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Pilih Gambar Utama"
                />
                <div
                  className={`w-full relative overflow-hidden transition-all ${
                    imagePreview
                      ? "border border-slate-200 rounded-xl group-hover:border-amber-400 group-hover:ring-2 group-hover:ring-amber-400/20 shadow-sm"
                      : "py-10 px-4 border-2 border-slate-200 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 group-hover:bg-amber-50 group-hover:border-amber-300 text-center"
                  }`}
                >
                  {imagePreview ? (
                    <div className="relative w-full aspect-video bg-slate-100">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-bold flex items-center gap-2">
                          <ImageIcon className="w-5 h-5" /> Ganti Gambar Utama
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-10 h-10 text-slate-300 group-hover:text-amber-500 mb-3" />
                      <span className="text-[14px] font-bold text-slate-600 group-hover:text-amber-700">
                        Klik untuk Memilih Gambar Utama
                      </span>
                      <span className="text-[12px] text-slate-400 mt-1">
                        Pilih gambar dari Galeri Media Anda
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="hidden"
                  name="featuredImage"
                  value={imagePreview}
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                Judul Artikel
              </label>
              <input
                required
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Masukkan judul artikel"
                className="w-full h-14 sm:h-16 px-5 sm:px-6 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-lg sm:text-4xl font-bold text-[#0B1528] placeholder:text-slate-300 placeholder:font-medium tracking-tight"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                Konten Artikel
              </label>
              <TipTapEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Pengaturan Tambahan
            </h3>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                Slug (URL)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  rumio.id/blog/
                </span>
                <input
                  required
                  name="slug"
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="judul-artikel"
                  className="w-full h-11 pl-[105px] pr-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm bg-slate-50"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Otomatis diisi berdasarkan judul. Boleh diubah secara manual
                jika diperlukan.
              </p>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                Kategori
              </label>
              <select
                required
                name="category"
                defaultValue={initialData?.category || "Tips Properti"}
                className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm bg-white"
              >
                <option value="Tips Properti">Tips Properti</option>
                <option value="Virtual Tour">Virtual Tour</option>
                <option value="Marketing Properti">Marketing Properti</option>
                <option value="Investasi">Investasi</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Panduan">Panduan</option>
              </select>
            </div>

            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                Nama Penulis
              </label>
              <input
                required
                name="author"
                defaultValue={initialData?.author}
                placeholder="Masukkan nama penulis"
                className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end sticky bottom-6 z-10">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
            className="h-12 px-6 rounded-xl font-bold text-slate-600"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#0B1528] hover:bg-[#1a2b4c] text-white h-12 px-8 rounded-xl font-bold shadow-md"
          >
            {loading
              ? "Menyimpan..."
              : isEditing
                ? "Simpan Perubahan"
                : "Terbitkan Artikel"}
          </Button>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(assets) => {
          if (assets.length > 0) {
            setImagePreview(assets[0].url);
          }
        }}
        multiple={false}
      />
    </form>
  );
}
