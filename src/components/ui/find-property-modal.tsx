"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";
import { submitInquiry } from "@/app/actions/inquiry";

interface FindPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FindPropertyModal({
  isOpen,
  onClose,
}: FindPropertyModalProps) {
  const [transactionType, setTransactionType] = useState("Beli");
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePropertyTypeToggle = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter((t) => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };

  const handleQuickLocation = (loc: string) => {
    setLocation(loc);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await submitInquiry({
      type: "CARI_PROPERTI",
      name,
      phone,
      transactionType,
      propertyType: propertyType.join(", "),
      location,
      budgetOrPrice: `${minPrice} - ${maxPrice}`,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setName("");
        setPhone("");
        setLocation("");
        setMinPrice("");
        setMaxPrice("");
        setPropertyType([]);
      }, 3000);
    } else {
      alert(res.error || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
        {/* Header Title (White bg) */}
        <div className="flex items-center justify-between p-4 px-5 border-b border-slate-100 bg-white shrink-0">
          <h2 className="text-[17px] font-bold text-[#0B1528]">
            Bantu Carikan Properti
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Banner */}

        {/* Form Body */}
        {success ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0B1528] mb-2">
              Permintaan Terkirim!
            </h3>
            <p className="text-slate-500">
              Tim kami akan segera mencarikan properti yang sesuai dan
              menghubungi Anda via WhatsApp.
            </p>
          </div>
        ) : (
          <div className="p-0 overflow-y-auto custom-scrollbar">
            <div className="relative h-24 bg-[#D98A2C] overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D98A2C] to-[#D98A2C]/40 z-10" />
              <img
                src="/Section-HeroPropertyScout.webp"
                alt="Find Property Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-20 p-4 px-5 text-white flex items-center h-full">
                <p className="text-sm font-medium leading-relaxed max-w-[80%]">
                  Susah cari properti? Tim Rumio siap bantu cari properti idaman
                  Anda!
                </p>
              </div>
            </div>
            <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0B1528] mb-2">
                  Saya Ingin <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {["Beli", "Sewa"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTransactionType(type)}
                      className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        transactionType === type
                          ? "border-[#D98A2C] bg-[#D98A2C]/10 text-[#D98A2C]"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0B1528] mb-2">
                  Properti yang saya inginkan{" "}
                  <span className="text-red-500">*</span>
                  <span className="text-xs font-normal text-slate-400 ml-1">
                    (Bisa pilih lebih dari 1)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {["Rumah", "Apartemen", "Tanah", "Ruko", "Gudang"].map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handlePropertyTypeToggle(type)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          propertyType.includes(type)
                            ? "border-[#D98A2C] bg-[#D98A2C]/10 text-[#D98A2C]"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {type}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#0B1528] mb-2">
                  Lokasi Properti <span className="text-red-500">*</span>
                </label>
                <div className="relative mb-3">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Masukkan nama area/kota..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D98A2C]/50 focus:border-[#D98A2C] transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Jakarta Selatan", "BSD", "Bintaro", "Gading Serpong"].map(
                    (loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => handleQuickLocation(loc)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[13px] rounded-md hover:bg-slate-200 transition-colors"
                      >
                        {loc}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-semibold text-[#0B1528] mb-2">
                  Kisaran Harga Properti <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-[#D98A2C] focus-within:ring-2 focus-within:ring-[#D98A2C]/30 transition-all">
                    <span className="px-3 py-2.5 bg-slate-50 border-r border-slate-200 text-slate-600 text-sm font-semibold h-full flex items-center">
                      Rp
                    </span>
                    <input
                      type="text"
                      required
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                  <span className="text-slate-300 font-bold">-</span>
                  <div className="flex-1 flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-[#D98A2C] focus-within:ring-2 focus-within:ring-[#D98A2C]/30 transition-all">
                    <span className="px-3 py-2.5 bg-slate-50 border-r border-slate-200 text-slate-600 text-sm font-semibold h-full flex items-center">
                      Rp
                    </span>
                    <input
                      type="text"
                      required
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1528] mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D98A2C]/50 focus:border-[#D98A2C] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1528] mb-2">
                    No. WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxx"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D98A2C]/50 focus:border-[#D98A2C] transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || propertyType.length === 0}
                className="w-full py-3.5 bg-[#D98A2C] text-white font-bold rounded-lg hover:bg-[#c47a24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Permintaan"}
              </button>
            </form>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
