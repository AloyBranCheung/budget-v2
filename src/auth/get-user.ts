import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma";
import { GetUserType } from "@/types/user";

const getUser = async (): Promise<GetUserType> => {
    const session = await getServerSession();
    if (!session || !session.user?.email) return null

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email
        }
    })
    if (!user) return null

    return { auth0User: session.user, dbUser: user }
}

export default getUser