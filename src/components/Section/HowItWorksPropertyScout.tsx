import {
  ClipboardList,
  Search,
  Smartphone,
  Handshake,
  Banknote,
} from "lucide-react";

export default function HowItWorksPropertyScout() {
  return (
    <section className="w-full bg-slate-50 py-20 px-6 lg:px-12 xl:px-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1528]">
            Cara Kerja <span className="text-amber-600">Property Scout</span>{" "}
            Rumio
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-4">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white z-10 relative">
                <ClipboardList className="w-8 h-8 text-[#0B1528] stroke-[1.5]" />
              </div>
              <div className="absolute -top-1 -left-1 w-7 h-7 bg-[#0B1528] text-white rounded-full flex items-center justify-center text-sm font-bold z-20 shadow-sm border-2 border-white">
                1
              </div>
            </div>
            <h3 className="font-bold text-[#0B1528] text-base md:text-lg mb-2">
              Daftar
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2">
              Isi form pendaftaran secara online. Gratis!
            </p>
            {/* Arrow for Desktop */}
            <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-60px)]">
              <div className="relative w-full flex items-center justify-end">
                <div className="w-full border-t border-dashed border-slate-300"></div>
                <div className="w-2 h-2 border-t border-r border-slate-300 rotate-45 absolute -right-1"></div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white z-10 relative">
                <Search className="w-8 h-8 text-[#0B1528] stroke-[1.5]" />
              </div>
              <div className="absolute -top-1 -left-1 w-7 h-7 bg-[#0B1528] text-white rounded-full flex items-center justify-center text-sm font-bold z-20 shadow-sm border-2 border-white">
                2
              </div>
            </div>
            <h3 className="font-bold text-[#0B1528] text-base md:text-lg mb-2">
              Cari Properti
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2">
              Temukan properti yang ingin dijual atau disewakan di sekitar Anda.
            </p>
            {/* Arrow for Desktop */}
            <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-60px)]">
              <div className="relative w-full flex items-center justify-end">
                <div className="w-full border-t border-dashed border-slate-300"></div>
                <div className="w-2 h-2 border-t border-r border-slate-300 rotate-45 absolute -right-1"></div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white z-10 relative">
                <Smartphone className="w-8 h-8 text-[#0B1528] stroke-[1.5]" />
              </div>
              <div className="absolute -top-1 -left-1 w-7 h-7 bg-[#0B1528] text-white rounded-full flex items-center justify-center text-sm font-bold z-20 shadow-sm border-2 border-white">
                3
              </div>
            </div>
            <h3 className="font-bold text-[#0B1528] text-base md:text-lg mb-2">
              Kirim Informasi
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2">
              Kirim detail properti melalui aplikasi/website Rumio.
            </p>
            {/* Arrow for Desktop */}
            <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-60px)]">
              <div className="relative w-full flex items-center justify-end">
                <div className="w-full border-t border-dashed border-slate-300"></div>
                <div className="w-2 h-2 border-t border-r border-slate-300 rotate-45 absolute -right-1"></div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white z-10 relative">
                <Handshake className="w-8 h-8 text-[#0B1528] stroke-[1.5]" />
              </div>
              <div className="absolute -top-1 -left-1 w-7 h-7 bg-[#0B1528] text-white rounded-full flex items-center justify-center text-sm font-bold z-20 shadow-sm border-2 border-white">
                4
              </div>
            </div>
            <h3 className="font-bold text-[#0B1528] text-base md:text-lg mb-2">
              Verifikasi & Publikasi
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2">
              Tim Rumio akan memverifikasi dan mempublikasikan properti.
            </p>
            {/* Arrow for Desktop */}
            <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-60px)]">
              <div className="relative w-full flex items-center justify-end">
                <div className="w-full border-t border-dashed border-slate-300"></div>
                <div className="w-2 h-2 border-t border-r border-slate-300 rotate-45 absolute -right-1"></div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex flex-col items-center text-center flex-1 w-full">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center bg-white z-10 relative">
                <Banknote className="w-8 h-8 text-[#0B1528] stroke-[1.5]" />
              </div>
              <div className="absolute -top-1 -left-1 w-7 h-7 bg-[#0B1528] text-white rounded-full flex items-center justify-center text-sm font-bold z-20 shadow-sm border-2 border-white">
                5
              </div>
            </div>
            <h3 className="font-bold text-[#0B1528] text-base md:text-lg mb-2">
              Dapatkan Komisi
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2">
              Dapatkan komisi ketika properti berhasil terjual/tersewa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
