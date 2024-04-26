import { PrismaClient } from '@prisma/client';
import pino from 'pino';
import axios from 'axios';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
})

const options = {
    method: 'GET',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    params: { search_engine: 'v3' },
    headers: { authorization: `Bearer ${process.env.AUTH0_TMP_API_TOKEN}` }
};

const prisma = new PrismaClient();

const main = async () => {
    const users = await prisma.user.findMany()
    if (users.length > 0) return logger.info('Users already in db, stopping migration...')
    try {
        logger.info('Querying Auth0 User DB...')
        const res = await axios.request(options)
        if (!res) throw new Error("No response found from Auth0.")
        const budgetv2Users = res.data.filter((usr: Record<string, string>) => Array.isArray(usr.identities) && usr.identities.some((identity) => identity.connection === 'budgetv2-user-pass'))
        const users = budgetv2Users.map((usr: Record<string, string>) => ({ name: usr.name, email: usr.email, auth0Id: usr.user_id, image: usr.picture }))
        logger.info('Adding Users to DB...')
        await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
        logger.info('Done!')
    } catch (error) {
        logger.error('Something went wrong! Log below: \n')
        logger.error(error);
    }
}
main()