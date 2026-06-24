import { addonPlans } from "@/data/pricing";

export default function AddonSection() {
  return (
    <section className="py-20 bg-white px-6 lg:px-12 xl:px-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-3">
            ADD-ON (TAMBAHAN)
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1528] mb-4">
            Tingkatkan Hasil Pemasaran dengan Add-On
          </h2>
          <p className="text-slate-600 text-lg">
            Pilih layanan tambahan untuk membuat properti Anda semakin menonjol.
          </p>
        </div>

        {/* Addon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-stretch">
          {addonPlans.map((addon) => (
            <div
              key={addon.id}
              className="bg-white rounded-[24px] border border-slate-200/80 p-5 md:p-6 flex flex-col items-center text-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="w-full aspect-square rounded-[18px] bg-slate-50 flex-shrink-0 flex items-center justify-center mb-6 overflow-hidden">
                <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-[#0B1528] text-[17px] mb-3 leading-tight px-2">
                {addon.name}
              </h3>
              <p className="text-slate-500 text-[13px] leading-[1.6] mb-6">
                {addon.description}
              </p>

              {/* Price */}
              <div className="mt-auto pt-2 w-full">
                <span className="text-amber-600 font-bold text-sm">Rp </span>
                <span className="text-amber-600 font-bold text-[22px] tracking-tight">
                  {addon.price}
                </span>
                {addon.priceSuffix && (
                  <span className="text-slate-500 text-[11px] font-medium ml-1">
                    {addon.priceSuffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-400 text-sm mt-12">
          * Add-on dapat dibeli bersamaan dengan paket utama atau setelah paket
          aktif.
        </p>
      </div>
    </section>
  );
}
