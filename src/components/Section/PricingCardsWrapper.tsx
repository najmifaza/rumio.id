"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderPackageModal, { AddonType } from "./OrderPackageModal";

export default function PricingCardsWrapper({ 
  pricingPlans, 
  addons,
  whatsappNumber
}: { 
  pricingPlans: any[];
  addons: AddonType[];
  whatsappNumber?: string;
}) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan) => {
          return (
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
                  {plan.price.toLocaleString("id-ID")}
                </span>
                <span className="text-slate-500 text-sm"> /properti</span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features?.map((feature: any) => (
                  <li key={feature.id} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                onClick={() => setSelectedPlan({ id: plan.id, name: plan.name, price: plan.price })}
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
          );
        })}
      </div>

      <OrderPackageModal 
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        selectedPlan={selectedPlan}
        addons={addons}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
