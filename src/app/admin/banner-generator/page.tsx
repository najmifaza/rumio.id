"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import {
  Download,
  Upload,
  LayoutTemplate,
  BedDouble,
  Bath,
  Maximize,
  Map,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import Icon360 from "@/components/ui/Icon360";

export default function BannerGenerator() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [ratio, setRatio] = useState("1:1"); // 1:1, 9:16, 4:5, 1.91:1
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

  const ratios = {
    "1:1": "aspect-square w-full max-w-[500px]",
    "9:16": "aspect-[9/16] w-full max-w-[320px]",
    "4:5": "aspect-[4/5] w-full max-w-[400px]",
    "1.91:1": "aspect-[1.91/1] w-full max-w-[600px]",
  };

  const handleDownload = useCallback(() => {
    if (bannerRef.current === null) {
      return;
    }

    // Scale up to 4K quality (pixelRatio: 6)
    toPng(bannerRef.current, { cacheBust: true, pixelRatio: 6 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Banner-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
        alert("Gagal mengunduh banner. Coba lagi.");
      });
  }, [title]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBgImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSpecs = () => (
    <>
      {kt && (
        <div
          className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}
        >
          <BedDouble
            className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3 md:w-3.5 md:h-3.5" : "w-3.5 h-3.5 md:w-4 md:h-4"}`}
          />
          <span
            className={`font-bold ${ratio === "9:16" ? "text-xs md:text-sm" : "text-sm md:text-base"}`}
          >
            {kt}
          </span>{" "}
          <span
            className={`${ratio === "9:16" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs"}`}
          >
            Kamar Tidur
          </span>
        </div>
      )}
      {km && (
        <div
          className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}
        >
          <Bath
            className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3 md:w-3.5 md:h-3.5" : "w-3.5 h-3.5 md:w-4 md:h-4"}`}
          />
          <span
            className={`font-bold ${ratio === "9:16" ? "text-xs md:text-sm" : "text-sm md:text-base"}`}
          >
            {km}
          </span>{" "}
          <span
            className={`${ratio === "9:16" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs"}`}
          >
            Kamar Mandi
          </span>
        </div>
      )}
      {lb && (
        <div
          className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}
        >
          <Maximize
            className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3 md:w-3.5 md:h-3.5" : "w-3.5 h-3.5 md:w-4 md:h-4"}`}
          />
          <span
            className={`font-bold ${ratio === "9:16" ? "text-xs md:text-sm" : "text-sm md:text-base"}`}
          >
            {lb} m²
          </span>{" "}
          <span
            className={`${ratio === "9:16" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs"}`}
          >
            L. Bangunan
          </span>
        </div>
      )}
      {lt && (
        <div
          className={`bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white ${ratio === "9:16" ? "px-2 py-1" : "px-2.5 md:px-3 py-1.5"}`}
        >
          <Map
            className={`shrink-0 ${ratio === "9:16" ? "w-3 h-3 md:w-3.5 md:h-3.5" : "w-3.5 h-3.5 md:w-4 md:h-4"}`}
          />
          <span
            className={`font-bold ${ratio === "9:16" ? "text-xs md:text-sm" : "text-sm md:text-base"}`}
          >
            {lt} m²
          </span>{" "}
          <span
            className={`${ratio === "9:16" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-xs"}`}
          >
            L. Tanah
          </span>
        </div>
      )}
    </>
  );

  const renderQRCode = () => {
    if (!qrUrl) return null;
    return (
      <div
        className={`shrink-0 bg-white rounded-xl shadow-2xl flex flex-col items-center ${ratio === "9:16" ? "p-1.5 md:p-2" : "p-2 md:p-2.5"}`}
      >
        <div className="relative flex items-center justify-center">
          <QRCodeCanvas
            value={qrUrl}
            size={ratio === "9:16" ? 50 : 80}
            level="H"
            includeMargin={false}
          />
          {/* Icon 360 Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-1 rounded-full flex items-center justify-center">
              <Icon360
                className={`text-[#D98A2C] ${ratio === "9:16" ? "w-3.5 h-3.5" : "w-5 h-5"}`}
              />
            </div>
          </div>
        </div>
        <span
          className={`font-extrabold text-[#D98A2C] uppercase text-center leading-[1.1] tracking-wider ${ratio === "9:16" ? "text-[6px] md:text-[7px] mt-1" : "text-[7px] md:text-[8px] mt-1.5"}`}
        >
          SCAN UNTUK
          <br />
          TUR 360
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528]">Pembuat Banner</h1>
          <p className="text-slate-500 text-sm mt-1">
            Buat materi promosi siap posting dengan cepat.
          </p>
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
        {/* Editor Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg border-b border-slate-100 pb-3">
            Informasi Banner
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
                Rasio Banner
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["1:1", "4:5", "9:16", "1.91:1"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`py-2 text-sm font-bold rounded-lg border transition-colors ${
                      ratio === r
                        ? "bg-[#D98A2C]/10 border-[#D98A2C] text-[#D98A2C]"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
                Upload Gambar Background
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D98A2C]/10 file:text-[#D98A2C] hover:file:bg-[#D98A2C]/20 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  Label/Badge
                </label>
                <input
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D98A2C]"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  Harga
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D98A2C]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
                Nama Properti
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-[#D98A2C]"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
                Lokasi Singkat
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D98A2C]"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 text-center">
                  Kamar Tidur
                </label>
                <input
                  value={kt}
                  onChange={(e) => setKt(e.target.value)}
                  className="w-full h-10 px-2 text-center border border-slate-200 rounded-lg text-sm outline-none focus:border-[#D98A2C]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 text-center">
                  Kamar Mandi
                </label>
                <input
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className="w-full h-10 px-2 text-center border border-slate-200 rounded-lg text-sm outline-none focus:border-[#D98A2C]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 text-center">
                  L. Bangunan
                </label>
                <input
                  value={lb}
                  onChange={(e) => setLb(e.target.value)}
                  className="w-full h-10 px-2 text-center border border-slate-200 rounded-lg text-sm outline-none focus:border-[#D98A2C]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 text-center">
                  L. Tanah
                </label>
                <input
                  value={lt}
                  onChange={(e) => setLt(e.target.value)}
                  className="w-full h-10 px-2 text-center border border-slate-200 rounded-lg text-sm outline-none focus:border-[#D98A2C]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">
                URL / Link Properti (Untuk QR Code)
              </label>
              <input
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
                className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#D98A2C]"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="lg:col-span-7 bg-slate-100/50 rounded-3xl p-4 sm:p-8 flex items-center justify-center min-h-[500px] border-2 border-dashed border-slate-300 overflow-hidden">
          {/* Banner Container */}
          <div
            ref={bannerRef}
            className={`${ratios[ratio as keyof typeof ratios]} relative bg-slate-900 overflow-hidden flex flex-col ${ratio === "9:16" ? "justify-between" : "justify-end"} group transition-all duration-300 ease-in-out`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            {/* Badge - Absolute only for non-9:16 */}
            {ratio !== "9:16" && badgeText && (
              <div className="absolute top-6 left-6 bg-[#D98A2C] text-white px-4 py-1.5 rounded-full text-[13px] md:text-sm font-extrabold tracking-wider z-10 shadow-lg uppercase">
                {badgeText}
              </div>
            )}

            {/* Logo Rumio */}
            <div className="absolute top-5 md:top-6 right-5 md:right-6 z-10">
              <img
                src="/logo-footer.svg"
                alt="Rumio.id"
                className="h-6 md:h-8 w-auto drop-shadow-lg"
              />
            </div>

            {/* Top Content for 9:16 */}
            {ratio === "9:16" && (
              <div className="relative z-10 p-5 md:p-6 w-full flex flex-col gap-1.5">
                {badgeText && (
                  <div className="bg-[#D98A2C] text-white px-3 h-6 md:h-8 flex items-center justify-center rounded-full text-[10px] md:text-xs font-extrabold tracking-wider shadow-lg uppercase w-max mb-1.5">
                    {badgeText}
                  </div>
                )}
                {location && (
                  <p className="text-white/90 font-medium mb-0.5 flex items-center gap-1.5 drop-shadow-md text-[11px] md:text-[12px]">
                    <svg
                      className="w-4 h-4 text-[#D98A2C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    {location}
                  </p>
                )}
                {title && (
                  <h2 className="text-white font-black leading-tight mb-1 drop-shadow-lg text-2xl md:text-4xl pr-16">
                    {title}
                  </h2>
                )}
                {price && (
                  <div className="text-[#D98A2C] font-extrabold drop-shadow-md text-xl md:text-3xl">
                    {price}
                  </div>
                )}
              </div>
            )}

            {/* Content Bottom */}
            <div
              className={`relative z-10 p-5 md:p-8 w-full flex ${ratio === "9:16" ? "flex-col gap-2" : "justify-between items-end gap-4"}`}
            >
              {ratio !== "9:16" && (
                <div className="flex-1">
                  {location && (
                    <p className="text-white/90 font-medium mb-1.5 flex items-center gap-1.5 drop-shadow-md text-[13px] md:text-sm">
                      <svg
                        className="w-4 h-4 text-[#D98A2C]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      {location}
                    </p>
                  )}

                  {title && (
                    <h2 className="text-white font-black leading-tight mb-2 drop-shadow-lg text-2xl md:text-4xl">
                      {title}
                    </h2>
                  )}

                  {price && (
                    <div className="text-[#D98A2C] font-extrabold drop-shadow-md text-xl md:text-3xl mb-4">
                      {price}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {renderSpecs()}
                  </div>
                </div>
              )}

              {ratio === "9:16" ? (
                <div className="flex justify-between items-end w-full gap-2">
                  <div className="flex flex-wrap gap-1.5 md:gap-2 flex-1">
                    {renderSpecs()}
                  </div>
                  {renderQRCode()}
                </div>
              ) : (
                renderQRCode()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
