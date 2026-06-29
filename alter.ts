import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE property ADD COLUMN whatsappClicks INT NOT NULL DEFAULT 0;');
    console.log('Success altering property table');
  } catch (e) {
    console.error('Error altering:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
