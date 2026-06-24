import { ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { statsData } from "@/data/stats";

export default function Services() {

  return (
    <>
      <section id="layanan" className="w-full bg-white py-24 px-6 lg:px-12 xl:px-0 font-sans">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-amber-600 tracking-[0.15em] uppercase">
              Layanan Rumio
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Solusi Pemasaran Properti Modern
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              Kami menyediakan layanan lengkap untuk membantu Anda mempromosikan
              properti secara maksimal.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="flex flex-col p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#0B1528] flex items-center justify-center mb-6 shadow-md shadow-slate-900/10">
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-[17px] font-bold text-[#0B1528] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-amber-600 hover:text-amber-700 transition-colors w-fit group"
                >
                  Pelajari lebih lanjut
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-[#0B1528] py-20 px-6 lg:px-12 xl:px-0 font-sans">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`group flex flex-col lg:px-10 hover:-translate-y-2 transition-all duration-300 cursor-pointer ${
                index !== 0 ? "lg:border-l lg:border-slate-700/60 hover:border-transparent" : "lg:pl-0"
              }`}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                <stat.icon className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-[40px] font-medium text-amber-500 leading-none tracking-tight mb-2 group-hover:text-amber-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-white font-bold text-[15px] tracking-wide mb-4">
                {stat.label}
              </div>
              <p className="text-[13px] text-slate-400 leading-relaxed lg:pr-2 group-hover:text-slate-300 transition-colors duration-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
