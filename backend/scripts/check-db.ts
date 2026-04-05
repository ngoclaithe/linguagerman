
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const video = await prisma.lessonVideo.findFirst();
  console.log('Sample LessonVideo:', video);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
