'use server'

import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma";
import { GetUserType } from "@/types/user";
import { config as authOptions } from '@/auth/auth-helper'

const getUser = async (): Promise<GetUserType> => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return null

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })
    if (!user) return null

    return { auth0User: session.user, dbUser: user }
}

export default getUser