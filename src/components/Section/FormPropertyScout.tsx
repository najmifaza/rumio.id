import { Target, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function FormPropertyScout() {
  return (
    <section
      id="daftar"
      className="w-full bg-slate-50  py-20 px-6 lg:px-12 xl:px-0"
    >
      <div className="max-w-[1400px] mx-auto bg-[#0B1528] rounded-3xl p-8 lg:p-12 xl:p-16 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex-1 text-white w-full">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold mb-5 leading-tight">
              Siap Menjadi <br />
              <span className="text-amber-500">Property Scout</span> Rumio?
            </h2>
            <p className="text-slate-300 mb-10 text-base lg:text-lg leading-relaxed max-w-[450px]">
              Isi data diri Anda dan bergabunglah sekarang. Tim kami akan segera
              menghubungi Anda!
            </p>

            <div className="flex flex-wrap sm:flex-nowrap gap-6 md:gap-8 border-t border-slate-700/60 pt-8">
              {/* Gratis */}
              <div className="flex flex-col gap-2.5 flex-1">
                <Target className="w-6 h-6 text-amber-500 stroke-[2]" />
                <h4 className="font-bold text-white text-sm md:text-base">
                  Gratis
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed pr-2">
                  Tidak ada biaya pendaftaran
                </p>
              </div>
              {/* Proses Cepat */}
              <div className="flex flex-col gap-2.5 flex-1 border-l-0 sm:border-l border-slate-700/60 sm:pl-6 md:pl-8">
                <Clock className="w-6 h-6 text-amber-500 stroke-[2]" />
                <h4 className="font-bold text-white text-sm md:text-base">
                  Proses Cepat
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed pr-2">
                  Verifikasi 1x24 jam setelah pendaftaran
                </p>
              </div>
              {/* Aman */}
              <div className="flex flex-col gap-2.5 flex-1 border-l-0 sm:border-l border-slate-700/60 sm:pl-6 md:pl-8">
                <ShieldCheck className="w-6 h-6 text-amber-500 stroke-[2]" />
                <h4 className="font-bold text-white text-sm md:text-base">
                  Aman
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed pr-2">
                  Data Anda terlindungi 100%
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-white/5 border border-slate-600 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
                {/* Nomor WhatsApp */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 0812 3456 7890"
                    className="w-full bg-white/5 border border-slate-600 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Contoh: email@gmail.com"
                    className="w-full bg-white/5 border border-slate-600 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
                {/* Kota Domisili */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Kota Domisili
                  </label>
                  <select
                    className="w-full bg-white/5 border border-slate-600 rounded-xl px-4 py-3.5 text-slate-300 appearance-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                    defaultValue=""
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="" disabled className="text-slate-500">
                      Pilih Kota
                    </option>
                    <option value="jakarta" className="text-[#0B1528]">
                      Jakarta
                    </option>
                    <option value="bogor" className="text-[#0B1528]">
                      Bogor
                    </option>
                    <option value="depok" className="text-[#0B1528]">
                      Depok
                    </option>
                    <option value="tangerang" className="text-[#0B1528]">
                      Tangerang
                    </option>
                    <option value="bekasi" className="text-[#0B1528]">
                      Bekasi
                    </option>
                    <option value="lainnya" className="text-[#0B1528]">
                      Lainnya
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(217,138,44,0.2)] hover:shadow-[0_0_30px_rgba(217,138,44,0.4)] flex items-center justify-center gap-3 group"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
