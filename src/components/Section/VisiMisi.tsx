import { Eye, Camera, Globe, MessageCircle, ShieldCheck } from "lucide-react";

export default function VisiMisi() {
  const missions = [
    {
      icon: Camera,
      title: "Visual Terbaik",
      description: "Menyajikan visual properti berkualitas tinggi yang menarik dan informatif."
    },
    {
      icon: Globe,
      title: "Akses Lebih Luas",
      description: "Memperluas jangkauan pemasaran properti ke lebih banyak calon pembeli."
    },
    {
      icon: MessageCircle,
      title: "Respons Lebih Cepat",
      description: "Menghubungkan pemilik dan calon pembeli melalui integrasi WhatsApp yang praktis."
    },
    {
      icon: ShieldCheck,
      title: "Transparan & Terpercaya",
      description: "Memberikan layanan yang profesional, aman, dan berorientasi pada hasil."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1500px]">
        {/* Visi Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#0B1528]">
            <span className="text-amber-600">Visi</span> Kami
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 max-w-3xl">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
              <Eye className="w-8 h-8 text-[#0B1528]" />
            </div>
            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed sm:text-left text-center">
              Menjadi platform pemasaran properti terdepan di Indonesia yang menggabungkan teknologi, kreativitas, dan kepercayaan.
            </p>
          </div>
        </div>

        {/* Misi Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#0B1528]">
            <span className="text-amber-600">Misi</span> Kami
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {missions.map((m, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <m.icon className="w-8 h-8 text-[#0B1528]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1528] mb-3">{m.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
