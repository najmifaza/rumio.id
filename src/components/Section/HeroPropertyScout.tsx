import Link from "next/link";
import {
  Clock,
  Briefcase,
  TrendingUp,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function HeroPropertyScout() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-20 min-h-[500px] lg:min-h-[650px] flex items-center">
      {/* Background Image Container (Right side) */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop")',
          }}
        />
        {/* Gradient mask to blend with the white background on the left */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 sm:via-white/60 lg:via-white/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0 py-20">
        <div className="max-w-2xl xl:max-w-3xl text-left">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Beranda", href: "/" },
              { label: "Property Scout" },
            ]}
          />
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold mb-6 tracking-tight text-[#0B1528] leading-tight">
            Jadi <span className="text-amber-600">Property Scout</span> Rumio
          </h1>

          <div className="mb-5 max-w-[600px]">
            <p className="text-[#0B1528] text-lg md:text-xl font-semibold mb-2">
              Cari properti, dapatkan komisi.
            </p>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              Waktu fleksibel, tanpa modal,{" "}
              <span className="text-amber-600 font-semibold">
                penghasilan tidak terbatas!
              </span>
            </p>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10 ">
            {/* Feature 1 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-amber-600 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-base md:text-lg mb-1.5">
                  Waktu Fleksibel
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed pr-2">
                  Kerja kapan saja, di mana saja
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-amber-600 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-base md:text-lg mb-1.5">
                  Tanpa Modal
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed pr-2">
                  Tidak perlu biaya pendaftaran
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-amber-600 stroke-[1.5]" />
              <div>
                <h4 className="text-[#0B1528] font-bold text-base md:text-lg mb-1.5">
                  Penghasilan Menarik
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed pr-2">
                  Dapatkan komisi setiap properti terjual/tersewa
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-5">
            <Link
              href="#daftar"
              className="bg-amber-600 hover:bg-amber-500 text-white h-14 px-8 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 w-fit shadow-md hover:shadow-lg group"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
