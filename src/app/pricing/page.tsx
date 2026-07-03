import HeroPricing from "@/components/Section/HeroPricing";
import PricingSection from "@/components/Section/PricingSection";
import AddonSection from "@/components/Section/AddonSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harga Paket Iklan & Virtual Tour 360° | Rumio.id",
  description: "Pilih paket langganan dan layanan iklan properti terbaik dari Rumio.id. Dapatkan fitur Virtual Tour 360° untuk meningkatkan visibilitas properti Anda.",
  openGraph: {
    title: "Harga Paket Iklan & Virtual Tour 360° | Rumio.id",
    description: "Pilih paket langganan dan layanan iklan properti terbaik dari Rumio.id. Dapatkan fitur Virtual Tour 360° untuk meningkatkan visibilitas properti Anda.",
    url: "https://rumio.id/pricing",
    type: "website",
  },
};
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      <HeroPricing />
      <PricingSection />
      <AddonSection />
    </main>
  );
}
