import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }: any) {
      const adminsEmails = await prisma.admin.findMany({
        select: {
          email: true,
        },
      });
      // only return a session if the user is in the database
      if (adminsEmails.some((admin) => admin.email === user.email)) {
        session.id = user.id;
        return session;
      } else {
        return null;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  debug: process.env.NODE_ENV === "development",
};
