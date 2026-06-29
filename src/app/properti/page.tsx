import { prisma } from "@/lib/prisma";
import PropertiesClient from "./properties-client";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  // Build Where query based on searchParams
  const where: Prisma.PropertyWhereInput = { status: "AVAILABLE" };

  if (typeof searchParams.q === "string" && searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q } },
      { location: { contains: searchParams.q } },
    ];
  }

  if (typeof searchParams.transaction === "string" && searchParams.transaction) {
    where.listingType = { in: searchParams.transaction.split(",") };
  }

  if (typeof searchParams.type === "string" && searchParams.type) {
    where.propertyType = { in: searchParams.type.split(",") };
  }

  if (typeof searchParams.minPrice === "string" && searchParams.minPrice) {
    where.price = { ...where.price, gte: parseFloat(searchParams.minPrice) };
  }
  if (typeof searchParams.maxPrice === "string" && searchParams.maxPrice) {
    where.price = { ...where.price, lte: parseFloat(searchParams.maxPrice) };
  }

  if (typeof searchParams.minArea === "string" && searchParams.minArea) {
    where.buildingArea = { ...where.buildingArea, gte: parseFloat(searchParams.minArea) };
  }
  if (typeof searchParams.maxArea === "string" && searchParams.maxArea) {
    where.buildingArea = { ...where.buildingArea, lte: parseFloat(searchParams.maxArea) };
  }

  if (typeof searchParams.minLand === "string" && searchParams.minLand) {
    where.landArea = { ...where.landArea, gte: parseFloat(searchParams.minLand) };
  }
  if (typeof searchParams.maxLand === "string" && searchParams.maxLand) {
    where.landArea = { ...where.landArea, lte: parseFloat(searchParams.maxLand) };
  }

  if (typeof searchParams.beds === "string" && searchParams.beds) {
    where.bedrooms = { gte: parseInt(searchParams.beds) };
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
