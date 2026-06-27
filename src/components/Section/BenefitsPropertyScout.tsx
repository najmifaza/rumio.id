import {
  Crown,
  Target,
  Headset,
  GraduationCap,
  CircleDollarSign,
} from "lucide-react";

export default function BenefitsPropertyScout() {
  return (
    <section className="w-full bg-white py-20 px-6 lg:px-12 xl:px-0 border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1528]">
            Keuntungan Menjadi{" "}
            <span className="text-amber-600">Property Scout</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          {/* Keuntungan 1 */}
          <div className="flex flex-col items-center text-center p-6 lg:px-6">
            <Crown className="w-10 h-10 text-amber-500 mb-5 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-base mb-3">
              Penghasilan Tidak Terbatas
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Semakin banyak properti yang Anda referensikan, semakin besar
              komisi Anda.
            </p>
          </div>

          {/* Keuntungan 2 */}
          <div className="flex flex-col items-center text-center p-6 lg:px-6">
            <Target className="w-10 h-10 text-amber-500 mb-5 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-base mb-3">
              Tanpa Target
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tidak ada target bulanan, kerja sesuai kemampuan dan waktu Anda.
            </p>
          </div>

          {/* Keuntungan 3 */}
          <div className="flex flex-col items-center text-center p-6 lg:px-6">
            <Headset className="w-10 h-10 text-amber-500 mb-5 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-base mb-3">
              Tim Support Profesional
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tim Rumio siap membantu Anda dalam setiap proses, dari awal hingga
              selesai.
            </p>
          </div>

          {/* Keuntungan 4 */}
          <div className="flex flex-col items-center text-center p-6 lg:px-6">
            <GraduationCap className="w-10 h-10 text-amber-500 mb-5 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-base mb-3">
              Training & Tools Lengkap
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Dapatkan materi, panduan, dan tools untuk membantu Anda menjadi
              scout yang sukses.
            </p>
          </div>

          {/* Keuntungan 5 */}
          <div className="flex flex-col items-center text-center p-6 lg:px-6">
            <CircleDollarSign className="w-10 h-10 text-amber-500 mb-5 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-base mb-3">
              Pembayaran Transparan
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Komisi dibayarkan dengan jelas dan tepat waktu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
