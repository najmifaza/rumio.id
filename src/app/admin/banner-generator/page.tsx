import { prisma } from "@/lib/prisma";
import BannerGeneratorClient from "./BannerGeneratorClient";

export const metadata = {
  title: "Admin - Pembuat Banner",
};

export default async function BannerGeneratorPage() {
  const mediaAssets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <BannerGeneratorClient initialAssets={mediaAssets} />;
}
