import HeroPropertyScout from "@/components/Section/HeroPropertyScout";
import RolesPropertyScout from "@/components/Section/RolesPropertyScout";
import BenefitsPropertyScout from "@/components/Section/BenefitsPropertyScout";
import HowItWorksPropertyScout from "@/components/Section/HowItWorksPropertyScout";
import FormPropertyScout from "@/components/Section/FormPropertyScout";

export const metadata = {
  title: "Property Scout | Rumio.id",
  description:
    "Layanan eksklusif Rumio.id untuk mencarikan properti impian sesuai kriteria Anda.",
};

export default function PropertyScoutPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroPropertyScout />
      <RolesPropertyScout />
      <HowItWorksPropertyScout />
      <BenefitsPropertyScout />
      <FormPropertyScout />
    </main>
  );
}
