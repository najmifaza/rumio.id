import { Building2, Users, Camera, TrendingUp } from "lucide-react";

export default function StatistikRumio() {
  const stats = [
    {
      icon: Building2,
      value: "1.250+",
      label: "Properti Aktif",
      description: "Telah kami bantu tampil lebih profesional",
    },
    {
      icon: Users,
      value: "850+",
      label: "Klien & Partner",
      description: "Pemilik, agen, dan developer yang mempercayai kami",
    },
    {
      icon: Camera,
      value: "3.600+",
      label: "Foto & Virtual Tour",
      description: "Diproduksi dengan standar tertinggi",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Kepuasan Klien",
      description: "Merasa puas dengan hasil dan layanan kami",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-[1500px]">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center ${index !== 0 ? 'pt-8 md:pt-0' : ''}`}
              >
                <stat.icon className="w-8 h-8 text-[#0B1528] mb-4 stroke-[1.5]" />
                <h3 className="text-4xl font-extrabold text-[#0B1528] mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-[#0B1528] font-bold mb-3 text-base">
                  {stat.label}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
