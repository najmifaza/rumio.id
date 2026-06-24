import { Search } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function HeroBlog() {
  return (
    <section className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] flex items-center overflow-hidden bg-white pt-20">
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?")',
          }}
        />
        {/* Gradient mask to blend with the white background on the left */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 sm:via-white/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0">
        <div className="max-w-2xl">
          <Breadcrumbs
            className="mb-6"
            items={[{ label: "Beranda", href: "/" }, { label: "Blog" }]}
          />
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold mb-4 md:mb-6 tracking-tight">
            <span className="text-[#0B1528]">Blog </span>
            <span className="text-amber-600">Rumio</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-[500px]">
            Tips, panduan, dan inspirasi seputar properti, pemasaran, dan
            teknologi visual.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-[560px] bg-white rounded-2xl border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Cari artikel, topik, atau kata kunci..."
              className="w-full h-14 pl-6 pr-14 text-[15px] rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 shadow-sm text-slate-800 placeholder:text-slate-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#0B1528] transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
