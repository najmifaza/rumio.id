import { prisma } from "@/lib/prisma";
import PropertiesClient from "./properties-client";

// PERF-3: Cache halaman listing — revalidate setiap 60 detik (ISR)
// sehingga tidak setiap request harus hit database.
export const revalidate = 60;

export default async function PropertiesPage() {
  // Ambil data properti dari database
  const properties = await prisma.property.findMany({
    where: { status: "AVAILABLE" },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <PropertiesClient initialProperties={properties} />;
}
