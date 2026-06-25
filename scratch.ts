import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const prop = await prisma.property.findUnique({
    where: { slug: 'apartemen-studio-furnished' },
  });
  console.log('highlights:', prop?.highlights);
  console.log('type:', typeof prop?.highlights);
  console.log('isArray:', Array.isArray(prop?.highlights));
}

main().finally(() => prisma.$disconnect());
