import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Membuat tabel propertyscout secara manual...");
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`propertyscout\` (
        \`id\` VARCHAR(191) NOT NULL,
        \`fullName\` VARCHAR(191) NOT NULL,
        \`whatsapp\` VARCHAR(191) NOT NULL,
        \`email\` VARCHAR(191) NOT NULL,
        \`city\` VARCHAR(191) NOT NULL,
        \`status\` VARCHAR(191) NOT NULL DEFAULT 'NEW',
        \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (\`id\`)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
    console.log("Tabel propertyscout berhasil dibuat!");
  } catch (error) {
    console.error("Gagal membuat tabel:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
