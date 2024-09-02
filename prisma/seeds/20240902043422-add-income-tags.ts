import { PrismaClient, TransactionType } from "@prisma/client";
import pino from "pino";
// utils
import addIconToDb from "../utils/add-icon-to-db";

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
  const incomeTags: {
    name: string;
    type: TransactionType;
    filename: string;
  }[] = [
    // TODO: add default descriptions
    {
      name: "Allowance",
      type: TransactionType.Income,
      filename: "allowance-icon.png",
    },
    {
      name: "Salary",
      type: TransactionType.Income,
      filename: "salary-icon.png",
    },
    {
      name: "Petty Cash",
      type: TransactionType.Income,
      filename: "petty-cash-icon.png",
    },
    {
      name: "Bonus",
      type: TransactionType.Income,
      filename: "bonus-icon.png",
    },
    {
      name: "Others",
      type: TransactionType.Income,
      filename: "more-icon.png",
    },
    {
      name: "e-transfer",
      type: TransactionType.Income,
      filename: "e-transfer-icon.png",
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
    data: incomeTags.map(({ name, type }) => ({ name, type })),
  });

  logger.info(`Added ${incomeTags.length} income tags.`);

  // add icon and connect tag
  await Promise.all(
    incomeTags.map(({ filename, name }) =>
      addIconToDb(filename, { connectToTag: true, tagName: name }),
    ),
  );
};

main();
