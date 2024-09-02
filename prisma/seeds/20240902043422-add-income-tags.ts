import { PrismaClient, Prisma, TransactionType } from "@prisma/client";
import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

const prisma = new PrismaClient();

const main = async () => {
  const incomeTags: Prisma.TagCreateManyInput[] = [
    // TODO: add default descriptions
    {
      name: "Allowance",
      type: TransactionType.Income,
    },
    {
      name: "Salary",
      type: TransactionType.Income,
    },
    {
      name: "Petty Cash",
      type: TransactionType.Income,
    },
    {
      name: "Bonus",
      type: TransactionType.Income,
    },
    {
      name: "Others",
      type: TransactionType.Income,
    },
  ];

  // check if tags exist in db
  const existingTags = await prisma.tag.findMany({
    where: {
      type: TransactionType.Income,
    },
  });
  if (existingTags.length > 0) {
    logger.info("Income tags already exist");
    return;
  }

  // add tags if it does not exist
  await prisma.tag.createMany({
    data: incomeTags,
  });

  logger.info(`Added ${incomeTags.length} income tags.`);
};

main();
