import { PrismaClient } from '@prisma/client';
import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
})

const prisma = new PrismaClient();

const addIconToDb = async (filename: string) => {
    logger.info(`Checking if ${filename} exists`)
    const exists = await prisma.images.findFirst({
        where: {
            name: filename
        }
    })
    if (exists) {
        logger.info(`${filename} already exists`)
        return
    }

    const file = fs.readFileSync(path.resolve(__dirname, '../static-data/assets', filename))
    const fileBuffer = Buffer.from(file)

    logger.info(`Creating ${filename}`)
    await prisma.images.create({
        data: {
            name: filename,
            bytes: fileBuffer
        }
    })
    logger.info(`Created ${filename}`)
}

export default addIconToDb