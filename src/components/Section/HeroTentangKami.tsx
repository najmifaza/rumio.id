import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroTentangKami() {
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

          <Link href="/kontak">
            <Button className="bg-[#0B1528] hover:bg-[#1a2b4c] text-white px-8 py-6 rounded-xl font-bold text-base h-auto">
              Hubungi Kami
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
