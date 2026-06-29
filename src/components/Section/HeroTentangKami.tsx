import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSettings } from "@/app/admin/settings/actions";

export default async function HeroTentangKami() {
  const { data } = await getSettings(["contact_whatsapp"]);
  const waNumberRaw = data?.contact_whatsapp || "";
  const waNumber = waNumberRaw.replace(/[^0-9]/g, "");
  
  const waText = encodeURIComponent("Halo Admin Rumio, saya ingin berdiskusi lebih lanjut tentang layanan dari Rumio.id.");
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : "#";
  return (
    <section className="relative w-full h-[500px] md:h-[550px] lg:h-[600px] flex items-center overflow-hidden bg-white pt-20">
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("/Section-HeroBeranda.webp")',
          }}
        />
        {/* Gradient mask to blend with the white background on the left */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 sm:via-white/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0">
        <div className="max-w-2xl pt-10">
          <Breadcrumbs
            className="mb-8"
            items={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }]}
          />
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold mb-6 tracking-tight">
            <span className="text-[#0B1528]">Tentang </span>
            <span className="text-amber-600">Rumio</span>
          </h1>

          <p className="text-[#0B1528] text-xl md:text-2xl font-medium mb-6 leading-snug">
            Membantu properti Anda tampil lebih menarik, dipercaya lebih cepat, dan terjual lebih mudah.
          </p>
          
          <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed max-w-[600px]">
            Rumio adalah platform visualisasi dan pemasaran properti berbasis teknologi yang membantu pemilik, agen, dan developer menampilkan properti secara profesional melalui foto premium, virtual tour 360°, landing page eksklusif, hingga integrasi WhatsApp.
          </p>

          <Link href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex">
            <Button
              size="hero"
              className="inline-flex gap-1.5 sm:gap-2 shadow-lg shadow-slate-900/20"
            >
              <span className="text-center leading-tight">
                Hubungi Kami
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
