"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Icon360 from "./Icon360";

interface ImageGalleryProps {
  gallery: { url: string; caption: string | null }[];
  title: string;
  badge?: string;
  virtualTourSectionId?: string; // CC-3: ID section untuk scroll ke virtual tour
}

export default function ImageGallery({
  gallery,
  title,
  badge,
  virtualTourSectionId,
}: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    // disable body scroll
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setIsOpen(false);
    // ISS-13 FIX: Reset ke "" agar nilai CSS asli (dari stylesheet/Lenis) berlaku kembali.
    // Menggunakan "auto" bisa secara paksa meng-override style lain.
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row gap-3 h-[400px] md:h-[500px] xl:h-[550px]">
        {/* Left Main Image */}
        <div
          className="w-full md:w-[60%] h-full rounded-2xl relative overflow-hidden group cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <img
            src={gallery[0].url}
            alt={gallery[0].caption || `${title} - Main`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {gallery[0].caption && (
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0B1528]/80 to-transparent flex items-end">
              <span className="text-white font-medium text-lg drop-shadow-md">
                {gallery[0].caption}
              </span>
            </div>
          )}
          {/* Top Left Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#0B1528] text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider">
              FOTO UTAMA
            </span>
          </div>
          {/* Tombol 360° — hanya tampil jika properti memiliki Virtual Tour */}
          {virtualTourSectionId && (
            <div className="absolute bottom-4 left-4 z-10">
              <button
                onClick={() =>
                  document
                    .getElementById(virtualTourSectionId)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="bg-white text-[#0B1528] px-6 py-4 rounded-2xl text-base font-bold shadow-lg flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                <Icon360 className="w-7 h-7 text-[#0B1528]" />
                Lihat Foto 360°
              </button>
            </div>
          )}
          {/* Gradient overlay is already added conditionally, or add base gradient */}
          {!gallery[0].caption && (
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Right Stack Images - 2 photos only */}
        {gallery.length > 1 && (
          <div className="hidden md:flex w-[40%] flex-col gap-3 h-full">
            {/* Image index 1 */}
            {gallery[1] && (
              <div
                className="flex-1 rounded-2xl overflow-hidden relative group cursor-pointer"
                onClick={() => openLightbox(1)}
              >
                <img
                  src={gallery[1].url}
                  alt={gallery[1].caption || `${title} - 1`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {gallery[1].caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B1528]/80 to-transparent flex items-end">
                    <span className="text-white font-medium text-sm drop-shadow-md">
                      {gallery[1].caption}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Image index 2 — with "+N more" overlay if gallery has >3 photos */}
            {gallery[2] && (
              <div
                className="flex-1 rounded-2xl overflow-hidden relative group cursor-pointer"
                onClick={() => openLightbox(2)}
              >
                <img
                  src={gallery[2].url}
                  alt={gallery[2].caption || `${title} - 2`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {gallery[2].caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B1528]/80 to-transparent flex items-end">
                    <span className="text-white font-medium text-sm drop-shadow-md">
                      {gallery[2].caption}
                    </span>
                  </div>
                )}
                {gallery.length > 3 && (
                  <div className="absolute inset-0 bg-[#0B1528]/55 flex items-center justify-center transition-colors group-hover:bg-[#0B1528]/65">
                    <span className="text-white font-bold text-lg lg:text-xl text-center px-2">
                      +{gallery.length - 3} Foto Lainnya
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-2 rounded-full"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {gallery.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-3 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-3 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Current Image */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[currentIndex].url}
              alt={gallery[currentIndex].caption || `${title} - ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {/* Caption & Counter */}
            <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2">
              {gallery[currentIndex].caption && (
                <div className="text-white bg-black/60 px-5 py-2 rounded-xl text-base font-medium tracking-wide">
                  {gallery[currentIndex].caption}
                </div>
              )}
              <div className="text-white/80 bg-black/50 px-4 py-1.5 rounded-full text-sm font-medium tracking-wider">
                {currentIndex + 1} / {gallery.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
