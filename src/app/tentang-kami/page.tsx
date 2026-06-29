import { Metadata } from "next";
import HeroTentangKami from "@/components/Section/HeroTentangKami";
import KisahRumio from "@/components/Section/KisahRumio";
import StatistikRumio from "@/components/Section/StatistikRumio";
import CtaRumio from "@/components/Section/CtaRumio";
import VisiMisi from "@/components/Section/VisiMisi";

export const metadata: Metadata = {
  title: "Tentang Kami | Rumio.id",
  description: "Pelajari lebih lanjut tentang Rumio.id, platform visualisasi dan pemasaran properti berbasis teknologi terdepan dengan Virtual Tour 360°.",
  openGraph: {
    title: "Tentang Kami | Rumio.id",
    description: "Pelajari lebih lanjut tentang Rumio.id, platform visualisasi dan pemasaran properti berbasis teknologi terdepan dengan Virtual Tour 360°.",
    url: "https://rumio.id/tentang-kami",
    type: "website",
    images: [
      {
        url: "https://rumio.id/Section-HeroBeranda.webp",
        width: 1200,
        height: 630,
        alt: "Tentang Rumio.id",
      },
    ],
  },
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <HeroTentangKami />
      <VisiMisi />
      <KisahRumio />
      <StatistikRumio />
      <CtaRumio />
    </main>
  );
}
