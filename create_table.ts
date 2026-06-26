import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Creating inquiry table...");
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`inquiry\` (
        \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`type\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`name\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`phone\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`transactionType\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`propertyType\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`location\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        \`budgetOrPrice\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        \`details\` text COLLATE utf8mb4_unicode_ci,
        \`status\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
        \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("Table inquiry created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
