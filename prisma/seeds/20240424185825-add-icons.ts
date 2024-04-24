import { PrismaClient } from '@prisma/client';
import pino from 'pino';
import fs from 'fs'
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

const main = async () => {
    const fileNames = ['add-icon.png', 'goal-icon.png', 'graph-icon.png', 'strategy-icon.png']

    for await (const filename of fileNames) {
        const exists = await prisma.images.findFirst({
            where: {
                name: filename
            }
        })

        if (exists) {
            logger.info("Image already in DB, moving on...")
            continue
        }

        const filePath = path.join(__dirname, '..', 'static-data/assets/', filename)
        const file = fs.readFileSync(filePath)
        const fileBuffer = Buffer.from(file)

        await prisma.images.create({
            data: {
                name: filename,
                bytes: fileBuffer
            }
        })
        logger.info(`Added ${filename} to DB...`)
    }

}

main()
