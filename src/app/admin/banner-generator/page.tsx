import { prisma } from "@/lib/prisma";
import BannerGeneratorClient from "./BannerGeneratorClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function BannerGeneratorPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  const userId = session?.user?.id as string;

  // Properti milik user (untuk OWNER) atau semua (untuk ADMIN)
  const properties = await prisma.property.findMany({
    where: isAdmin ? {} : { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      location: true,
      bedrooms: true,
      bathrooms: true,
      buildingArea: true,
      landArea: true,
      featuredImage: true,
      images: {
        select: { imageUrl: true, caption: true },
        take: 20,
      },
    },
  });

  return (
    <BannerGeneratorClient
      properties={properties}
      isAdmin={isAdmin}
    />
  );
}
