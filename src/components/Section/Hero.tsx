import {
  Box,
  Smartphone,
  QrCode,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Icon360 from "@/components/ui/Icon360";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans overflow-hidden flex flex-col justify-center">
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <img
          src="/image.png"
          alt="Modern House Background"
          className="w-full h-full object-cover object-right absolute inset-0"
        />
        {/* Gradient mask to blend with the white background on the left */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 sm:via-white/50 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0">
        <main className="flex flex-col lg:flex-row items-center pt-24 pb-24 lg:py-0 min-h-screen">
          {/* Left Column (Text & CTAs) */}
          <div className="w-full lg:w-[75%] xl:w-[60%] flex flex-col justify-center space-y-8 relative pt-12 lg:pt-0">
            {/* Badge */}
            <Badge variant="amber" className="gap-2 px-4 py-1.5 w-fit">
              <span className="text-[11px] font-bold tracking-wider uppercase">
                #1 Platform Visualisasi & Pemasaran Properti
              </span>
            </Badge>

            {/* Typography */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#0B1528] leading-[1.2] lg:leading-[1.15] tracking-tight">
                Pamerkan Properti <br className="hidden sm:block" />
                Anda Secara Profesional, <br className="hidden sm:block" />
                Tingkatkan Peluang <br className="hidden sm:block" />
                <span className="text-amber-600">Lebih Cepat Terjual.</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-[540px]">
                Rumio membantu Anda menampilkan properti dengan{" "}
                <span className="font-semibold text-slate-800">
                  Virtual Tour 360°
                </span>
                , Landing Page Eksklusif, dan QR Code otomatis untuk menjangkau
                lebih banyak calon pembeli.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Button size="hero" className="inline-flex w-1/2 sm:w-auto gap-1.5 sm:gap-2 shadow-lg shadow-slate-900/20">
                <span className="text-center leading-tight">
                  Lihat Demo Properti
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </Button>
              <Button variant="outline" size="hero" className="inline-flex w-1/2 sm:w-auto gap-1.5 sm:gap-2 shadow-sm text-[#0B1528]">
                <span className="text-center leading-tight">
                  Daftarkan Properti
                </span>
                <Box className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 shrink-0" />
              </Button>
            </div>

            {/* Bottom Features */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 pt-10 border-t border-slate-200/60 mt-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <div className="p-2 rounded-full bg-slate-100/80">
                  <Icon360 className="w-5 h-5 text-slate-600 shrink-0 opacity-80" />
                </div>
                Virtual Tour 360°
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <div className="p-2 rounded-full bg-slate-100/80">
                  <Smartphone className="w-5 h-5 text-slate-600 shrink-0" />
                </div>
                <span className="flex flex-col">
                  <span className="leading-tight">Landing Page</span>
                  <span className="leading-tight">Eksklusif</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <div className="p-2 rounded-full bg-slate-100/80">
                  <QrCode className="w-5 h-5 text-slate-600 shrink-0" />
                </div>
                <span className="flex flex-col">
                  <span className="leading-tight">QR Code</span>
                  <span className="leading-tight">Otomatis</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <div className="p-2 rounded-full bg-slate-100/80">
                  <MessageCircle className="w-5 h-5 text-slate-600 shrink-0" />
                </div>
                <span className="flex flex-col">
                  <span className="leading-tight">Integrasi</span>
                  <span className="leading-tight">WhatsApp</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Floating Card) */}
        </main>
      </div>
    </div>
  );
}
