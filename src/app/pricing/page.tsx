import HeroPricing from "@/components/Section/HeroPricing";
import PricingSection from "@/components/Section/PricingSection";
import ComparisonSection from "@/components/Section/ComparisonSection";
import AddonSection from "@/components/Section/AddonSection";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      <HeroPricing />

      <PricingSection />
      <ComparisonSection />
      <AddonSection />
    </main>
  );
}
