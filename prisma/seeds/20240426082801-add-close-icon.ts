import { PrismaClient } from "@prisma/client";
import pino from "pino";
import fs from "fs";
import path from "path";

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
  const iconName = "close-icon.png";
  logger.info(`Checking if ${iconName} exists.`);
  const exists = await prisma.images.findFirst({
    where: {
      name: iconName,
    },
  });
  if (exists) {
    logger.info(`${iconName} already exists.`);
    return;
  }

  logger.info(`Adding ${iconName} to database.`);
  const image = fs.readFileSync(
    path.join(__dirname, "../static-data/assets", iconName),
  );
  const buffer = Buffer.from(image);
  await prisma.images.create({
    data: {
      name: iconName,
      bytes: buffer,
    },
  });
  logger.info(`Added ${iconName} to database.`);
};

main();
