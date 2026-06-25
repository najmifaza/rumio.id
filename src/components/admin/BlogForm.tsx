"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveBlog } from "@/app/admin/blogs/actions";
import type { Blog } from "@prisma/client";
import dynamic from "next/dynamic";

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
  const [imagePreview, setImagePreview] = useState(initialData?.featuredImage || "");
  const isEditing = !!initialData;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
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
      <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
          {isEditing ? "Edit Artikel" : "Tulis Artikel Baru"}
        </h3>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">
            Judul Artikel
          </label>
          <input
            required
            name="title"
            defaultValue={initialData?.title}
            placeholder="Masukkan judul artikel"
            className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
          />
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

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">
            Gambar Utama
          </label>
          <div className="flex gap-4 items-end">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-slate-200" />
            )}
            <div className="flex-1 space-y-2">
              <input
                type="file"
                name="featuredImageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full h-11 px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm bg-white"
              />
              <input type="hidden" name="existingFeaturedImage" value={initialData?.featuredImage || ""} />
              <p className="text-xs text-slate-500">
                * Upload file gambar baru dari perangkat Anda. Jika kosong, gambar lama akan dipertahankan.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="text-[13px] font-bold text-slate-700">
            Konten Artikel
          </label>
          <TipTapEditor value={content} onChange={setContent} />
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
    </form>
  );
}
