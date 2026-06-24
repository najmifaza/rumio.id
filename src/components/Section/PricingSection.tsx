import { Check, Gift, MessageCircle, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/data/pricing";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  return (
    <section className="py-20 bg-slate-50 px-6 lg:px-12 xl:px-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-3">
            PAKET UTAMA
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1528] mb-4">
            Pilih Paket yang Sesuai Kebutuhan Anda
          </h2>
          <p className="text-slate-600 text-lg">
            Semua paket dapat disesuaikan dengan jenis properti Anda.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-[24px] p-8 flex flex-col h-full ${
                plan.isPopular
                  ? "border-2 border-amber-500 shadow-xl shadow-amber-500/10 md:-translate-y-4"
                  : "border border-slate-200 shadow-sm"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  ★ PALING POPULER
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    plan.isPopular
                      ? "bg-amber-500 text-white"
                      : "bg-[#0B1528] text-white"
                  }`}
                >
                  <plan.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B1528]">
                    {plan.name}
                  </h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm mb-6 min-h-[40px]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-slate-600 font-medium">Rp </span>
                <span className="text-4xl font-bold text-[#0B1528]">
                  {plan.price}
                </span>
                <span className="text-slate-500 text-sm"> /properti</span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                variant={plan.isPopular ? "default" : "outline"}
                className={`mt-auto w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
                  plan.isPopular
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-slate-300 text-[#0B1528] hover:bg-slate-50"
                }`}
              >
                Pilih Paket {plan.name}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Package Banner */}
        <div className="mt-16 bg-white border border-slate-200 rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0B1528] mb-1">
                Butuh paket khusus?
              </h4>
              <p className="text-slate-600 text-sm">
                Hubungi kami untuk penawaran paket custom sesuai kebutuhan Anda.
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full md:w-auto h-12 px-6 rounded-xl border-amber-200 text-[#0B1528] hover:bg-amber-50 flex items-center gap-2 font-semibold whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5 text-amber-600" />
            Hubungi Kami
          </Button>
        </div>
      </div>
    </section>
  );
}
