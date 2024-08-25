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
  const iconName = "profile-icon.png";
  logger.info(`Checking if ${iconName} exists...`);
  const exists = await prisma.images.findFirst({
    where: {
      name: iconName,
    },
  });
  if (exists) {
    logger.info(`Icon ${iconName} already exists`);
    return;
  }
  const file = fs.readFileSync(
    path.join(__dirname, "../static-data/assets", iconName),
  );
  const buffer = Buffer.from(file);

  await prisma.images.create({
    data: {
      name: iconName,
      bytes: buffer,
    },
  });

  logger.info(`Icon ${iconName} created`);
};

main();
