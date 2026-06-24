import { Camera, Clock, Settings, Headset } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function HeroPricing() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-20 min-h-[500px] lg:min-h-[600px] flex items-center">
      {/* Background Image Container (Right side) */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              'url("https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Gambar rumah modern malam hari
          }}
        />
        {/* Gradient mask to blend with the white background on the left */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 sm:via-white/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0 py-20">
        <div className="max-w-2xl xl:max-w-3xl text-left">
          <Breadcrumbs
            className="mb-6"
            items={[{ label: "Beranda", href: "/" }, { label: "Paket Harga" }]}
          />
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold mb-6 tracking-tight text-[#0B1528] leading-tight">
            Paket Harga <span className="text-amber-600">Rumio</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl mb-12 md:mb-16 leading-relaxed max-w-[600px]">
            Pilih paket terbaik untuk memasarkan properti Anda secara
            profesional. Semua paket sudah termasuk landing page, virtual
            tour, dan dukungan penuh dari tim Rumio.
          </p>

          {/* Features Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 md:pt-10 border-t border-slate-200/60 mt-4">
            {/* Feature 1 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Camera className="w-6 h-6 md:w-7 md:h-7 text-slate-500 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-sm md:text-base mb-1">
                  Visual Profesional
                </h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pr-2">
                  Tampilkan properti secara terbaik
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Clock className="w-6 h-6 md:w-7 md:h-7 text-slate-500 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-sm md:text-base mb-1">
                  Hasil Lebih Cepat
                </h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pr-2">
                  Tingkatkan peluang terjual atau tersewa
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Settings className="w-6 h-6 md:w-7 md:h-7 text-slate-500 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-sm md:text-base mb-1">
                  Mudah & Praktis
                </h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pr-2">
                  Proses cepat tanpa repot teknis
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Headset className="w-6 h-6 md:w-7 md:h-7 text-slate-500 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-sm md:text-base mb-1">
                  Dukungan Penuh
                </h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pr-2">
                  Tim Rumio siap membantu Anda kapan saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
