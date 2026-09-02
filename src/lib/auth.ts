/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_build_only",
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const admin = await prisma.adminUser.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) {
          // If no admin exists in DB, check if it's the default credentials for initial setup
          if (
            credentials.username === process.env.DEFAULT_ADMIN_USER &&
            credentials.password === process.env.DEFAULT_ADMIN_PASSWORD
          ) {
            return { id: "default", name: "Admin" };
          }
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin.id,
          name: admin.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
