import Hero from "@/components/Section/Hero";
import Services from "@/components/Section/Services";
import FeaturedProperties from "@/components/Section/FeaturedProperties";
import HowItWorks from "@/components/Section/HowItWorks";
import { getSettings } from "@/app/admin/settings/actions";

export default async function Home() {
  const { data } = await getSettings(["contact_whatsapp"]);
  const waNumber = data?.contact_whatsapp?.replace(/[^0-9]/g, "") || "";

  return (
    <>
      <Hero />
      <Services />
      <FeaturedProperties />
      <HowItWorks />
    </>
  );
}
