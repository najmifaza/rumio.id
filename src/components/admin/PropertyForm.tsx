"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveProperty } from "@/app/admin/properties/actions";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Star,
  UploadCloud,
} from "lucide-react";
import VirtualTourBuilder from "./VirtualTourBuilder";
import type { Property, PropertyImage } from "@prisma/client";
import type { VirtualTourData } from "@/components/ui/VirtualTourViewer";

type PropertyWithImages = Property & { images: PropertyImage[] };

export default function PropertyForm({ initialData }: { initialData?: PropertyWithImages }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  // Highlights state
  const initialHighlights =
    initialData?.highlights && Array.isArray(initialData.highlights)
      ? (initialData.highlights as string[])
      : [""];
  const [highlights, setHighlights] = useState<string[]>(initialHighlights);

  const handleAddHighlight = () => setHighlights([...highlights, ""]);
  const handleRemoveHighlight = (index: number) => {
    const newH = [...highlights];
    newH.splice(index, 1);
    setHighlights(newH.length ? newH : [""]);
  };
  const handleHighlightChange = (index: number, val: string) => {
    const newH = [...highlights];
    newH[index] = val;
    setHighlights(newH);
  };

  // Images state
  const [images, setImages] = useState<
    { id: string; url: string; file: File | null; caption: string }[]
  >(() => {
    if (initialData?.images && initialData.images.length > 0) {
      return (initialData.images as { imageUrl: string; caption?: string }[]).map((img, idx) => ({
        id: `init-${idx}`,
        url: img.imageUrl,
        file: null,
        caption: img.caption || "",
      }));
    } else if (initialData?.featuredImage) {
      return [
        {
          id: `init-0`,
          url: initialData.featuredImage,
          file: null,
          caption: "",
        },
      ];
    }
    // Default to empty array (user uploads what they want)
    return [];
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    setDraggedIndex(index);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
  ) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newImages = [...images];
    const draggedImg = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImg);

    setImages(newImages);
    setDraggedIndex(null);
  };

  const handleRemoveImage = (index: number) => {
    const newI = [...images];
    newI.splice(index, 1);
    setImages(newI);
  };

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file: file,
      caption: "",
    }));

    setImages([...images, ...newImages]);
    e.target.value = "";
  };

  const handleCaptionChange = (index: number, val: string) => {
    const newI = [...images];
    newI[index].caption = val;
    setImages(newI);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length < 3) {
      alert("Mohon masukkan minimal 3 gambar properti.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Validate Maps URL
    const mapsUrl = formData.get("mapsUrl") as string;
    if (mapsUrl && mapsUrl.trim() !== "") {
      if (!mapsUrl.includes("embed") && !mapsUrl.includes("iframe")) {
        alert(
          "Validasi Peta Gagal: Harap masukkan kode <iframe src=...> atau link Embed Google Maps yang valid. Link biasa tidak diizinkan.",
        );
        setLoading(false);
        return;
      }
    }

    // Process Highlights
    const validHighlights = highlights.filter((h) => h.trim() !== "");
    formData.append("highlights", JSON.stringify(validHighlights));

    // Process Images
    formData.append("imageCount", images.length.toString());
    images.forEach((img, idx) => {
      formData.append(`imageUrl_${idx}`, img.url);
      if (img.file) {
        formData.append(`imageFile_${idx}`, img.file);
      }
      if (img.caption) {
        formData.append(`imageCaption_${idx}`, img.caption);
      }
      if (0 === idx) {
        formData.append(`isFeatured_${idx}`, "true");
      }
    });

    const res = await saveProperty(formData, initialData?.id);

    if (res.success) {
      router.push("/admin/properties");
    } else {
      alert(res.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri */}
        <div className="xl:col-span-7 space-y-6">
          {/* Informasi Dasar */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Informasi Dasar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Judul Properti
                </label>
                <input
                  required
                  name="title"
                  defaultValue={initialData?.title}
                  placeholder="Contoh: Rumah Minimalis Modern"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Lokasi
                </label>
                <input
                  required
                  name="location"
                  defaultValue={initialData?.location}
                  placeholder="Contoh: Jakarta Selatan"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Harga (Rp)
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  defaultValue={initialData?.price}
                  placeholder="Contoh: 1500000000"
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Tipe Properti
                </label>
                <select
                  required
                  name="propertyType"
                  defaultValue={initialData?.propertyType || "Rumah"}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm bg-white"
                >
                  <option value="Rumah">Rumah</option>
                  <option value="Apartemen">Apartemen</option>
                  <option value="Villa">Villa</option>
                  <option value="Tanah">Tanah</option>
                  <option value="Ruko">Ruko</option>
                </select>
              </div>

              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Tipe Iklan
                </label>
                <select
                  required
                  name="listingType"
                  defaultValue={initialData?.listingType || "Dijual"}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm bg-white"
                >
                  <option value="Dijual">Dijual</option>
                  <option value="Disewakan">Disewakan</option>
                </select>
              </div>

              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Kondisi
                </label>
                <select
                  required
                  name="condition"
                  defaultValue={initialData?.condition || "Baru"}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm bg-white"
                >
                  <option value="Baru">Baru</option>
                  <option value="Bekas">Bekas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Spesifikasi Bangunan */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Spesifikasi Bangunan
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Kamar Tidur
                </label>
                <input
                  required
                  type="number"
                  name="bedrooms"
                  defaultValue={initialData?.bedrooms}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Kamar Mandi
                </label>
                <input
                  required
                  type="number"
                  name="bathrooms"
                  defaultValue={initialData?.bathrooms}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Luas Tanah (m²)
                </label>
                <input
                  required
                  type="number"
                  name="landArea"
                  defaultValue={initialData?.landArea}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Luas Bgn (m²)
                </label>
                <input
                  required
                  type="number"
                  name="buildingArea"
                  defaultValue={initialData?.buildingArea}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Jml Lantai
                </label>
                <input
                  required
                  type="number"
                  name="floors"
                  defaultValue={initialData?.floors || 1}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Listrik (Watt)
                </label>
                <input
                  required
                  type="number"
                  name="electricity"
                  defaultValue={initialData?.electricity}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Tahun Bangun
                </label>
                <input
                  required
                  type="number"
                  name="buildYear"
                  defaultValue={initialData?.buildYear}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Deskripsi Lengkap
            </h3>
            <div className="space-y-2.5">
              <textarea
                required
                name="description"
                defaultValue={initialData?.description}
                rows={6}
                placeholder="Tuliskan deskripsi menarik tentang properti ini..."
                className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none text-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Detail Tambahan */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Detail Tambahan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Sumber Air
                </label>
                <input
                  required
                  name="waterSupply"
                  defaultValue={initialData?.waterSupply || "PAM"}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-slate-700">
                  Sertifikat
                </label>
                <input
                  required
                  name="certificate"
                  defaultValue={initialData?.certificate || "SHM"}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2.5 md:col-span-2">
                <label className="text-[13px] font-bold text-slate-700">
                  Arah Hadap (Opsional)
                </label>
                <input
                  name="facing"
                  defaultValue={initialData?.facing || "Selatan"}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B1528]">
                Highlights Properti
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddHighlight}
                className="h-8 rounded-lg text-amber-600 border-amber-200 hover:bg-amber-50"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Poin
              </Button>
            </div>
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700 shrink-0">
                    {index + 1}
                  </span>
                  <input
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(index, e.target.value)
                    }
                    placeholder="Contoh: Dekat Tol"
                    className="flex-1 h-10 px-3 border border-slate-200 rounded-lg outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveHighlight(index)}
                    className="w-10 h-10 shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {highlights.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-2">
                  Belum ada highlight. Klik tombol &quot;Poin&quot; untuk
                  menambahkan.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="xl:col-span-5 space-y-6">
          {/* Lokasi Google Maps */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Lokasi Google Maps
            </h3>
            <div className="space-y-2.5">
              <label className="text-[13px] font-bold text-slate-700">
                URL Embed / Tautan Peta
              </label>
              <input
                name="mapsUrl"
                defaultValue={initialData?.mapsUrl ?? undefined}
                placeholder="Contoh: https://www.google.com/maps/embed?pb=..."
                className="w-full h-11 px-4 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm placeholder:text-slate-400"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ⚠️ <strong>Penting:</strong> Agar peta tampil interaktif, salin
                link <strong>Sematkan Peta (Embed)</strong> dari Google Maps
                yang berawalan <code>&lt;iframe src=...</code>. Link biasa hanya
                menjadi tombol Lihat Maps.
              </p>
            </div>
          </div>

          {/* Virtual Tour 360 */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#0B1528] border-b border-slate-100 pb-3">
              Virtual Tour 360° (Builder)
            </h3>
            <VirtualTourBuilder initialData={initialData?.virtualTourData as VirtualTourData | null | undefined} />
            <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
              ℹ️ Anda bisa menambahkan beberapa foto ruangan 360, memilih titik awal (Start), dan menaruh panah hotspot antar ruangan.
            </p>
          </div>

          {/* Galeri Gambar */}
          <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B1528] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-slate-400" />
                Galeri Gambar (Min. 3)
              </h3>
            </div>

            {/* Master Uploader Zone */}
            <div className="relative group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultipleImages}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full py-10 px-4 border-2 border-slate-200 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 group-hover:bg-amber-50 group-hover:border-amber-300 transition-colors text-center">
                <UploadCloud className="w-10 h-10 text-slate-300 group-hover:text-amber-500 mb-3" />
                <span className="text-[14px] font-bold text-slate-600 group-hover:text-amber-700">
                  Klik atau Seret Beberapa Gambar ke Sini
                </span>
                <span className="text-[12px] text-slate-400 mt-1">
                  Upload banyak gambar sekaligus. Klik lagi untuk menambah lagi.
                </span>
              </div>
            </div>

            {/* Image Thumbnails Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, idx)}
                    className={`rounded-xl border ${0 === idx ? "border-amber-400 bg-amber-50 shadow-sm ring-1 ring-amber-400" : "border-slate-200 bg-white"} overflow-hidden relative transition-all group cursor-move hover:shadow-md ${draggedIndex === idx ? "opacity-50" : "opacity-100"}`}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] bg-slate-100 w-full">
                      {img.url ? (
                        <img
                          src={img.url}
                          alt="Gallery"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Delete Button (Hover) */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-slate-200/50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Footer Controls */}
                    <div className="p-2.5 h-10 flex items-center justify-between border-t border-slate-100/50 bg-white/50 backdrop-blur-sm relative">
                      {0 === idx ? (
                        <>
                          <span className="text-[12px] font-bold text-amber-600 flex items-center gap-1.5">
                            Gambar Utama
                          </span>
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500 drop-shadow-sm" />
                        </>
                      ) : (
                        <span className="text-[12px] font-medium text-slate-400 italic">
                          Urutan #{idx + 1}
                        </span>
                      )}
                    </div>
                    {/* Caption Input */}
                    <div className="p-2.5 pt-0 bg-white/50 backdrop-blur-sm border-t-0">
                      <input
                        type="text"
                        placeholder="Contoh: Dapur, Kamar Utama..."
                        value={img.caption || ""}
                        onChange={(e) => handleCaptionChange(idx, e.target.value)}
                        className="w-full h-8 px-2.5 text-[11px] border border-slate-200 rounded-md outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 bg-white placeholder:text-slate-400 transition-all font-medium text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-end gap-4 sticky bottom-6 z-10 ">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/properties")}
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
              : "Tambah Properti"}
        </Button>
      </div>
    </form>
  );
}
