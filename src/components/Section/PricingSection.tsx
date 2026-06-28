import { Check, Gift, MessageCircle, ArrowRight, Send, Crown, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatPriceFull } from "@/lib/format";
import PricingCardsWrapper from "./PricingCardsWrapper";

const IconMap: Record<string, any> = {
  Send,
  Crown,
  Gem,
};

export default async function PricingSection() {
  const pricingPlans = await prisma.pricingPlan.findMany({
    orderBy: { price: 'asc' },
    include: {
      features: {
        orderBy: { sortOrder: 'asc' }
      }
    }
  });

  const addons = await prisma.addonPlan.findMany({
    orderBy: { price: 'asc' }
  });

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
        <PricingCardsWrapper pricingPlans={pricingPlans} addons={addons} />

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
