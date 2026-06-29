import { prisma } from "@/lib/prisma";
import PropertiesClient from "./properties-client";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  // Build Where query based on resolvedParams
  const where: Prisma.PropertyWhereInput = { status: "AVAILABLE" };

  if (typeof resolvedParams.q === "string" && resolvedParams.q) {
    where.OR = [
      { title: { contains: resolvedParams.q } },
      { location: { contains: resolvedParams.q } },
    ];
  }

  if (typeof resolvedParams.transaction === "string" && resolvedParams.transaction) {
    where.listingType = { in: resolvedParams.transaction.split(",") };
  }

  if (typeof resolvedParams.type === "string" && resolvedParams.type) {
    where.propertyType = { in: resolvedParams.type.split(",") };
  }

  if (typeof resolvedParams.minPrice === "string" && resolvedParams.minPrice) {
    where.price = { ...(typeof where.price === 'object' ? where.price : {}), gte: parseFloat(resolvedParams.minPrice) };
  }
  if (typeof resolvedParams.maxPrice === "string" && resolvedParams.maxPrice) {
    where.price = { ...(typeof where.price === 'object' ? where.price : {}), lte: parseFloat(resolvedParams.maxPrice) };
  }

  if (typeof resolvedParams.minArea === "string" && resolvedParams.minArea) {
    where.buildingArea = { ...(typeof where.buildingArea === 'object' ? where.buildingArea : {}), gte: parseFloat(resolvedParams.minArea) };
  }
  if (typeof resolvedParams.maxArea === "string" && resolvedParams.maxArea) {
    where.buildingArea = { ...(typeof where.buildingArea === 'object' ? where.buildingArea : {}), lte: parseFloat(resolvedParams.maxArea) };
  }

  if (typeof resolvedParams.minLand === "string" && resolvedParams.minLand) {
    where.landArea = { ...(typeof where.landArea === 'object' ? where.landArea : {}), gte: parseFloat(resolvedParams.minLand) };
  }
  if (typeof resolvedParams.maxLand === "string" && resolvedParams.maxLand) {
    where.landArea = { ...(typeof where.landArea === 'object' ? where.landArea : {}), lte: parseFloat(resolvedParams.maxLand) };
  }

  if (typeof resolvedParams.beds === "string" && resolvedParams.beds) {
    where.bedrooms = { gte: parseInt(resolvedParams.beds) };
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.property.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <PropertiesClient
      initialProperties={properties}
      totalProperties={total}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
