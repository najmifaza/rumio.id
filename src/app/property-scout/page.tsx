import HeroPropertyScout from "@/components/Section/HeroPropertyScout";
import RolesPropertyScout from "@/components/Section/RolesPropertyScout";
import BenefitsPropertyScout from "@/components/Section/BenefitsPropertyScout";
import HowItWorksPropertyScout from "@/components/Section/HowItWorksPropertyScout";
import FormPropertyScout from "@/components/Section/FormPropertyScout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gabung Jadi Property Scout | Rumio.id",
  description:
    "Jadilah bagian dari Rumio.id sebagai Property Scout. Temukan properti, referensikan, dan dapatkan penghasilan tambahan dengan mudah tanpa ribet.",
  openGraph: {
    title: "Gabung Jadi Property Scout | Rumio.id",
    description:
      "Jadilah bagian dari Rumio.id sebagai Property Scout. Temukan properti, referensikan, dan dapatkan penghasilan tambahan dengan mudah tanpa ribet.",
    url: "https://rumio.id/property-scout",
    type: "website",
  },
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
