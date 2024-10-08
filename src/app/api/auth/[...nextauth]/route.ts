import { config } from "@/auth/auth-helper";
import NextAuth from "next-auth/next";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
