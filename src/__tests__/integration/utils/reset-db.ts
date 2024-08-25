import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resetDb = async () => {
  const user = await prisma.user.findFirst({
    where: {
      name: "test@test.com",
    },
  });
  if (!user) throw new Error("Test setup error: no test user in db");

  await prisma.$transaction([
    prisma.category.deleteMany({
      where: {
        userId: user.id,
      },
    }),
    prisma.paycheck.deleteMany(),
    prisma.tag.deleteMany({
      where: {
        userId: user.id,
      },
    }),
    prisma.transaction.deleteMany(),
  ]);
};

export default resetDb;
