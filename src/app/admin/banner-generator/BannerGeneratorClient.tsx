"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import {
  Download,
  Upload,
  BedDouble,
  Bath,
  Maximize,
  Map,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import Icon360 from "@/components/ui/Icon360";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import type { MediaAssetType } from "@/components/admin/MediaGallery";
import { formatPriceFull } from "@/lib/format";

// Tipe data properti yang dikirim dari server
type PropertyOption = {
  id: string;
  title: string;
  slug: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  buildingArea: number;
  landArea: number;
  featuredImage: string | null;
  images: { imageUrl: string; caption: string | null }[];
};

// Modal Pilih Gambar dari Properti (Khusus OWNER)
function PropertyImagePickerModal({
  property,
  onSelect,
  onClose,
}: {
  property: PropertyOption;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const allImages = [
    ...(property.featuredImage ? [{ url: property.featuredImage, caption: "Featured" }] : []),
    ...property.images
      .filter((img) => img.imageUrl !== property.featuredImage)
      .map((img) => ({ url: img.imageUrl, caption: img.caption })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-[#0B1528]">Pilih Gambar Properti</h2>
            <p className="text-sm text-slate-400">{property.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {allImages.length === 0 ? (
            <p className="text-center text-slate-400 py-12">Properti ini belum memiliki gambar.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onSelect(img.url);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-xl overflow-hidden border-2 border-slate-200 hover:border-amber-500 transition-all"
                >
                  <img
                    src={img.url}
                    alt={img.caption || `Gambar ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full items-center justify-center hidden group-hover:flex shadow-md">
                      <Check className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                  {img.caption === "Featured" && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      UTAMA
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Props utama
type Props = {
  properties: PropertyOption[];
  isAdmin: boolean;
};

export default function BannerGeneratorClient({ properties, isAdmin }: Props) {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showPropertyImageModal, setShowPropertyImageModal] = useState(false);

  // Properti yang dipilih (khusus mode dropdown)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) ?? null;

  // Form State
  const [ratio, setRatio] = useState("1:1");
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  );
  const [badgeText, setBadgeText] = useState("PROMO SPESIAL");
  const [title, setTitle] = useState("Cluster Asri Bintaro");
  const [price, setPrice] = useState("Mulai Rp 2,5 Milyar");
  const [location, setLocation] = useState("Bintaro, Tangerang Selatan");
  const [kt, setKt] = useState("3");
  const [km, setKm] = useState("2");
  const [lb, setLb] = useState("90");
  const [lt, setLt] = useState("120");
  const [qrUrl, setQrUrl] = useState("https://rumio.id/properti/cluster-asri");

  const ratios: Record<string, string> = {
    "1:1": "aspect-square w-full max-w-[500px]",
    "9:16": "aspect-[9/16] w-full max-w-[320px]",
    "4:5": "aspect-[4/5] w-full max-w-[400px]",
    "1.91:1": "aspect-[1.91/1] w-full max-w-[600px]",
  };

  // Saat properti dipilih dari dropdown, auto-fill semua field
  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    const prop = properties.find((p) => p.id === propertyId);
    if (!prop) return;

    setTitle(prop.title);
    setLocation(prop.location);
    setPrice(formatPriceFull(prop.price));
    setKt(String(prop.bedrooms));
    setKm(String(prop.bathrooms));
    setLb(String(prop.buildingArea));
    setLt(String(prop.landArea));
    setQrUrl(`https://rumio.id/properti/${prop.slug}`);
    if (prop.featuredImage) setBgImage(prop.featuredImage);
  };

  const handleDownload = useCallback(() => {
    if (!bannerRef.current) return;
    toPng(bannerRef.current, { cacheBust: true, pixelRatio: 6 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Banner-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(() => alert("Gagal mengunduh banner. Coba lagi."));
  }, [title]);

  const handleMediaSelect = (assets: MediaAssetType[]) => {
    if (assets.length > 0) setBgImage(assets[0].url);
    setShowMediaModal(false);
  };

  const renderSpecs = () => (
    <>
      {kt && (
        <div className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}>
          <BedDouble className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"}`} />
          <span className={`font-bold ${ratio === "9:16" ? "text-xs" : "text-sm md:text-base"}`}>{kt}</span>{" "}
          <span className={`${ratio === "9:16" ? "text-[9px]" : "text-[10px] md:text-xs"}`}>KT</span>
        </div>
      )}
      {km && (
        <div className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}>
          <Bath className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"}`} />
          <span className={`font-bold ${ratio === "9:16" ? "text-xs" : "text-sm md:text-base"}`}>{km}</span>{" "}
          <span className={`${ratio === "9:16" ? "text-[9px]" : "text-[10px] md:text-xs"}`}>KM</span>
        </div>
      )}
      {lb && (
        <div className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}>
          <Maximize className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"}`} />
          <span className={`font-bold ${ratio === "9:16" ? "text-xs" : "text-sm md:text-base"}`}>{lb} m²</span>{" "}
          <span className={`${ratio === "9:16" ? "text-[9px]" : "text-[10px] md:text-xs"}`}>LB</span>
        </div>
      )}
      {lt && (
        <div className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}>
          <Map className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3" : "w-3.5 h-3.5 md:w-4 md:h-4"}`} />
          <span className={`font-bold ${ratio === "9:16" ? "text-xs" : "text-sm md:text-base"}`}>{lt} m²</span>{" "}
          <span className={`${ratio === "9:16" ? "text-[9px]" : "text-[10px] md:text-xs"}`}>LT</span>
        </div>
      )}
    </>
  );

  const renderQRCode = () => {
    if (!qrUrl) return null;
    return (
      <div className={`shrink-0 bg-white rounded-xl shadow-2xl flex flex-col items-center ${ratio === "9:16" ? "p-1.5 md:p-2" : "p-2 md:p-2.5"}`}>
        <div className="relative flex items-center justify-center">
          <QRCodeCanvas value={qrUrl} size={ratio === "9:16" ? 50 : 80} level="H" includeMargin={false} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-1 rounded-full flex items-center justify-center">
              <Icon360 className={`text-[#D98A2C] ${ratio === "9:16" ? "w-3.5 h-3.5" : "w-5 h-5"}`} />
            </div>
          </div>
        </div>
        <span className={`font-extrabold text-[#D98A2C] uppercase text-center leading-[1.1] tracking-wider ${ratio === "9:16" ? "text-[6px] mt-1" : "text-[7px] md:text-[8px] mt-1.5"}`}>
          SCAN UNTUK<br />TUR 360
        </span>
      </div>
    );
  };

  const renderBannerContent = () => (
    <div
      ref={bannerRef}
      className={`${ratios[ratio]} relative bg-slate-900 overflow-hidden flex flex-col ${ratio === "9:16" ? "justify-between" : "justify-end"} transition-all duration-300 ease-in-out`}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

      {ratio !== "9:16" && badgeText && (
        <div className="absolute top-6 left-6 bg-[#D98A2C] text-white px-4 py-1.5 rounded-full text-[13px] md:text-sm font-extrabold tracking-wider z-10 shadow-lg uppercase">
          {badgeText}
        </div>
      )}
      <div className="absolute top-5 md:top-6 right-5 md:right-6 z-10">
        <img src="/logo-footer.svg" alt="Rumio.id" className="h-6 md:h-8 w-auto drop-shadow-lg" />
      </div>

      {ratio === "9:16" && (
        <div className="relative z-10 p-5 md:p-6 w-full flex flex-col gap-1.5">
          {badgeText && (
            <div className="bg-[#D98A2C] text-white px-3 h-6 md:h-8 flex items-center justify-center rounded-full text-[10px] md:text-xs font-extrabold tracking-wider shadow-lg uppercase w-max mb-1.5">
              {badgeText}
            </div>
          )}
          {location && (
            <p className="text-white/90 font-medium mb-0.5 flex items-center gap-1.5 drop-shadow-md text-[11px] md:text-[12px]">
              <svg className="w-4 h-4 text-[#D98A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          )}
          {title && <h2 className="text-white font-black leading-tight mb-1 drop-shadow-lg text-2xl md:text-4xl pr-16">{title}</h2>}
          {price && <div className="text-[#D98A2C] font-extrabold drop-shadow-md text-xl md:text-3xl">{price}</div>}
        </div>
      )}

      <div className={`relative z-10 p-5 md:p-8 w-full flex ${ratio === "9:16" ? "flex-col gap-2" : "justify-between items-end gap-4"}`}>
        {ratio !== "9:16" && (
          <div className="flex-1">
            {location && (
              <p className="text-white/90 font-medium mb-1.5 flex items-center gap-1.5 drop-shadow-md text-[13px] md:text-sm">
                <svg className="w-4 h-4 text-[#D98A2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
            {title && <h2 className="text-white font-black leading-tight mb-2 drop-shadow-lg text-2xl md:text-4xl">{title}</h2>}
            {price && <div className="text-[#D98A2C] font-extrabold drop-shadow-md text-xl md:text-3xl mb-4">{price}</div>}
            <div className="flex flex-wrap gap-2 md:gap-3">{renderSpecs()}</div>
          </div>
        )}
        {ratio === "9:16" ? (
          <div className="flex justify-between items-end w-full gap-2">
            <div className="flex flex-wrap gap-1.5 md:gap-2 flex-1">{renderSpecs()}</div>
            {renderQRCode()}
          </div>
        ) : (
          renderQRCode()
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1528]">Pembuat Banner</h1>
            <p className="text-slate-500 text-sm mt-1">Buat materi promosi siap posting dengan cepat.</p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-5 h-5" />
            Unduh Banner (PNG)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Editor */}
          <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg border-b border-slate-100 pb-3">Informasi Banner</h3>

            <div className="space-y-4">
              {/* Rasio */}
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Rasio Banner</label>
                <div className="grid grid-cols-4 gap-2">
                  {["1:1", "4:5", "9:16", "1.91:1"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRatio(r)}
                      className={`py-2 text-sm font-bold rounded-lg border transition-colors ${ratio === r ? "bg-[#D98A2C]/10 border-[#D98A2C] text-[#D98A2C]" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilih Properti - Dropdown */}
              {properties.length > 0 && (
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    {isAdmin ? "Pilih Properti (Opsional)" : "Pilih Properti Anda"}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPropertyId}
                      onChange={(e) => handlePropertySelect(e.target.value)}
                      className="w-full h-11 pl-4 pr-10 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D98A2C] focus:ring-2 focus:ring-[#D98A2C]/20 appearance-none bg-white font-medium text-slate-700"
                    >
                      <option value="">-- Pilih atau isi manual --</option>
                      {properties.map((prop) => (
                        <option key={prop.id} value={prop.id}>
                          {prop.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {selectedProperty && (
                    <p className="text-xs text-emerald-600 mt-1.5 font-medium">
                      ✓ Data dan QR Code sudah terisi otomatis dari properti yang dipilih
                    </p>
                  )}
                </div>
              )}

              {/* Gambar Background */}
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Gambar Background</label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <img src={bgImage} className="w-16 h-16 object-cover rounded-lg border border-slate-200 bg-white shrink-0" alt="preview" />
                    <p className="text-xs font-medium text-slate-500">Gambar background saat ini</p>
                  </div>
                  {/* ADMIN: buka MediaPickerModal | OWNER: buka PropertyImagePickerModal */}
                  {isAdmin ? (
                    <button
                      onClick={() => setShowMediaModal(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#D98A2C] text-[#D98A2C] hover:bg-[#D98A2C]/5 rounded-xl text-sm font-bold transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Pilih dari Galeri Media
                    </button>
                  ) : (
                    <button
                      onClick={() => selectedProperty ? setShowPropertyImageModal(true) : alert("Pilih properti terlebih dahulu!")}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#D98A2C] text-[#D98A2C] hover:bg-[#D98A2C]/5 rounded-xl text-sm font-bold transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      {selectedProperty ? `Pilih Foto dari "${selectedProperty.title}"` : "Pilih Properti dulu, lalu pilih foto"}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Label/Badge</label>
                  <input value={badgeText} onChange={(e) => setBadgeText(e.target.value)} className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D98A2C]" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Harga</label>
                  <input 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    readOnly={!isAdmin}
                    className={`w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none ${!isAdmin ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "focus:border-[#D98A2C]"}`} 
                  />
                </div>
              </div>


              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Nama Properti</label>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-[#D98A2C]" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Lokasi Singkat</label>
                <input 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  readOnly={!isAdmin}
                  className={`w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none ${!isAdmin ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "focus:border-[#D98A2C]"}`} 
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "KT", val: kt, setter: setKt },
                  { label: "KM", val: km, setter: setKm },
                  { label: "LB (m²)", val: lb, setter: setLb },
                  { label: "LT (m²)", val: lt, setter: setLt },
                ].map(({ label, val, setter }) => (
                  <div key={label}>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1 text-center">{label}</label>
                    <input 
                      value={val} 
                      onChange={(e) => setter(e.target.value)} 
                      readOnly={!isAdmin}
                      className={`w-full h-10 px-2 text-center border border-slate-200 rounded-lg text-sm outline-none ${!isAdmin ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "focus:border-[#D98A2C]"}`} 
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Link QR Code</label>
                <input
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  readOnly={!isAdmin}
                  className={`w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none ${!isAdmin ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "focus:border-[#D98A2C]"}`}
                />
                {!isAdmin && (
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedProperty
                      ? "Link otomatis dari properti yang dipilih"
                      : "Pilih properti terlebih dahulu agar link QR terisi otomatis"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-7 bg-slate-100/50 rounded-3xl p-4 sm:p-8 flex items-center justify-center min-h-[500px] border-2 border-dashed border-slate-300 overflow-hidden">
            {renderBannerContent()}
          </div>
        </div>
      </div>

      {/* Modal ADMIN: Galeri Media Global */}
      {isAdmin && (
        <MediaPickerModal
          isOpen={showMediaModal}
          onClose={() => setShowMediaModal(false)}
          onSelect={handleMediaSelect}
          multiple={false}
        />
      )}

      {/* Modal OWNER: Gambar dari Properti */}
      {!isAdmin && showPropertyImageModal && selectedProperty && (
        <PropertyImagePickerModal
          property={selectedProperty}
          onSelect={(url) => setBgImage(url)}
          onClose={() => setShowPropertyImageModal(false)}
        />
      )}
    </>
  );
}
