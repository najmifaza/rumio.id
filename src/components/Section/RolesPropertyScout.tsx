import { User, Briefcase, Home, Users } from "lucide-react";

export default function RolesPropertyScout() {
  return (
    <section className="w-full bg-white py-20 px-6 lg:px-12 xl:px-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1528] mb-3">
            Siapa yang Bisa Bergabung?
          </h2>
          <p className="text-slate-500 text-lg">
            Siapa saja bisa menjadi Property Scout Rumio!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <User className="w-8 h-8 text-[#0B1528] mb-4 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-lg mb-2">
              Masyarakat Umum
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Siapa saja yang ingin mendapatkan penghasilan tambahan.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <Briefcase className="w-8 h-8 text-[#0B1528] mb-4 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-lg mb-2">
              Agen Properti
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tingkatkan jaringan dan dapatkan komisi lebih banyak.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <Home className="w-8 h-8 text-[#0B1528] mb-4 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-lg mb-2">
              Mahasiswa & Fresh Graduate
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Manfaatkan waktu luang untuk menghasilkan pendapatan.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-8 h-8 text-[#0B1528] mb-4 stroke-[1.5]" />
            <h3 className="font-bold text-[#0B1528] text-lg mb-2">
              Komunitas & Influencer
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Punya jaringan luas? Ajak mereka menemukan properti terbaik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
