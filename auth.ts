import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { safePromise } from "@/utils";
import prisma from "@/db";

type CredentialsParams = { email: string; password: string };

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  // events: {
  //   async signIn(message) {
  //     console.log(message);
  //   },
  // },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as CredentialsParams;
        const [user] = await safePromise(
          prisma.user.findUnique({ where: { email } }),
        );
        const isValidPassword = await bcrypt.compare(
          password,
          user?.password ?? "",
        );
        const { id, name, image } = user ?? {};

        if (isValidPassword) return { email, name, id, image };
        else throw new Error("Invalid email or password");
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
