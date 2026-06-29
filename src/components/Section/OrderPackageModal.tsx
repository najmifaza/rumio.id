"use client";

import { useState } from "react";
import { X, Check, Upload, Building, MapPin, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitPackageOrder } from "@/app/actions/order";

export type AddonType = {
  id: string;
  name: string;
  price: number;
};

interface OrderPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    id: string;
    name: string;
    price: number;
  } | null;
  addons?: AddonType[]; // Pass available addons from parent or fetch them
  whatsappNumber?: string;
}

export default function OrderPackageModal({
  isOpen,
  onClose,
  selectedPlan,
  addons = [],
  whatsappNumber = ""
}: OrderPackageModalProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !selectedPlan) return null;

  const totalAddonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = selectedPlan.price + totalAddonsPrice;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentMethod) return alert("Pilih metode pembayaran");
    if (!proofFile) return alert("Upload bukti pembayaran");

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("planId", selectedPlan.id);
      formData.append("planName", selectedPlan.name);
      formData.append("totalPrice", totalPrice.toString());
      formData.append("paymentMethod", paymentMethod);
      
      const addonDetails = selectedAddons.map(id => addons.find(a => a.id === id)?.name);
      formData.append("addons", JSON.stringify(addonDetails));
      formData.append("proofOfPayment", proofFile);

      const result = await submitPackageOrder(formData);

      if (result.success) {
        // Build WhatsApp Message
        const customerName = formData.get("customerName") as string;
        const propertyType = formData.get("propertyType") as string;
        
        const message = `Halo Tim Rumio,\n\nSaya ${customerName} telah melakukan pemesanan *Paket ${selectedPlan.name}* untuk properti tipe *${propertyType}*.\nTotal Bayar: Rp ${totalPrice.toLocaleString("id-ID")}\nMetode: ${paymentMethod}\n\nMohon segera diproses ya.`;
        
        const waUrl = whatsappNumber 
          ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
          : `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        
        // Reset form & close
        setSelectedAddons([]);
        setPaymentMethod("");
        setProofFile(null);
        onClose();
        
        // Redirect to WA
        window.open(waUrl, "_blank");
      } else {
        alert(result.error || "Gagal mengirim pesanan");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl h-[90vh] max-h-[800px] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#0B1528]">Order Paket Listing</h2>
            <p className="text-slate-500 text-sm mt-1">Lengkapi data untuk memesan {selectedPlan.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0" data-lenis-prevent="true">
          <form id="orderForm" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Data Diri & Properti */}
            <div>
              <h3 className="text-base font-bold text-[#0B1528] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">1</span>
                Informasi Pemesan & Properti
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
                  <input required name="customerName" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none transition-colors bg-white text-slate-900 placeholder:text-slate-400" placeholder="Cth: Budi Santoso" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Nomor WhatsApp</label>
                  <input required name="whatsapp" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none transition-colors bg-white text-slate-900 placeholder:text-slate-400" placeholder="Cth: 081234567890" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Tipe Properti</label>
                  <select required name="propertyType" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none transition-colors bg-white text-slate-900">
                    <option value="">Pilih tipe properti...</option>
                    <option value="Rumah">Rumah</option>
                    <option value="Apartemen">Apartemen</option>
                    <option value="Tanah">Tanah</option>
                    <option value="Komersial">Komersial/Ruko</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Lokasi Kota/Kecamatan</label>
                  <input required name="location" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none transition-colors bg-white text-slate-900 placeholder:text-slate-400" placeholder="Cth: Bintaro, Tangerang Selatan" />
                </div>
              </div>
            </div>

            {/* Section 2: Add-ons */}
            {addons.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-[#0B1528] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">2</span>
                  Layanan Tambahan (Add-on)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {addons.map(addon => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <div 
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                          isSelected ? "border-amber-500 bg-amber-50/50" : "border-slate-100 hover:border-slate-200 bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-[#0B1528]">{addon.name}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-amber-500 bg-amber-500 text-white" : "border-slate-300"}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <span className="text-amber-600 font-bold text-sm">+ Rp {addon.price.toLocaleString("id-ID")}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section 3: Pembayaran */}
            <div>
              <h3 className="text-base font-bold text-[#0B1528] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">3</span>
                Pembayaran
              </h3>
              
              <div className="bg-slate-50 p-5 rounded-2xl mb-6 flex justify-between items-center border border-slate-100">
                <span className="text-slate-600 font-medium">Total Tagihan:</span>
                <span className="text-2xl font-bold text-[#0B1528]">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              <label className="block text-sm font-bold text-slate-700 mb-3">Pilih Metode Pembayaran</label>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div 
                  onClick={() => setPaymentMethod("QRIS")}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === "QRIS" ? "border-amber-500 bg-amber-50/50" : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <QrCode className="w-6 h-6 text-slate-400" />
                  <span className="font-bold text-sm">QRIS</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod("BCA")}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === "BCA" ? "border-amber-500 bg-amber-50/50" : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-slate-400" />
                  <span className="font-bold text-sm">Transfer BCA</span>
                </div>
              </div>

              {paymentMethod && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
                  {paymentMethod === "QRIS" ? (
                    <div className="text-center">
                      <p className="text-sm text-slate-500 mb-4">Scan QR code di bawah ini menggunakan aplikasi mobile banking atau e-wallet Anda.</p>
                      <div className="w-48 h-48 bg-slate-100 mx-auto rounded-lg mb-2 flex items-center justify-center text-slate-400">
                        [Gambar QRIS Rumio]
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-slate-500 mb-2">Transfer ke rekening berikut:</p>
                      <p className="font-bold text-xl text-[#0B1528]">BCA 1234 5678 90</p>
                      <p className="text-sm text-slate-600">a/n PT Rumio Digital Properti</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Bukti Pembayaran</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    required
                    onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {proofFile ? (
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium text-sm truncate max-w-[200px]">{proofFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-sm font-medium text-slate-600">Klik atau drag foto resi/screenshot ke sini</span>
                    </>
                  )}
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white shrink-0">
          <Button 
            form="orderForm"
            type="submit" 
            disabled={isSubmitting || !paymentMethod || !proofFile}
            className="w-full h-12 rounded-xl text-base font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
            ) : (
              "Kirim Pesanan & Konfirmasi via WA"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Tambahan agar tidak error kompilasi
const QrCode = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
)
