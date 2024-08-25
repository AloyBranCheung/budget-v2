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
  const exists = await prisma.images.findFirst({
    where: {
      name: "home-icon.png",
    },
  });
  if (exists) return logger.info("home-icon.png already in DB, moving on...");
  // read file sync home icon
  logger.info("Beginning to insert binary file to postgres...");
  const currDir = __dirname;
  const filePath = path.join(currDir, "..", "static-data/assets/home-icon.png");

  const file = fs.readFileSync(filePath);
  const fileBuffer = Buffer.from(file);

  await prisma.images.create({
    data: {
      name: "home-icon.png",
      bytes: fileBuffer,
    },
  });

  logger.info("Done!");
};

main();
