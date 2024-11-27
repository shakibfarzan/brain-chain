import { Prisma, User } from "@prisma/client";
import { z } from "zod";

import {
  emailSchema,
  optionalString,
  passwordSchema,
  safePromise,
  userNameSchema,
} from "@/utils";
import prisma from "@/db";
import { DBReturnType } from "@/types";
import { auth } from "@/auth";

const userSchema = z.object({
  email: emailSchema,
  name: userNameSchema,
  password: passwordSchema,
  bio: optionalString,
  image: optionalString,
});

export const createUser = async (
  data: Prisma.UserCreateInput,
): Promise<DBReturnType<Prisma.UserCreateInput>> => {
  const {
    success,
    data: parsedData,
    error: schemaError,
  } = userSchema.safeParse(data);

  if (success) {
    const [res, error] = await safePromise(
      prisma.user.create({ data: parsedData }),
    );

    return { data: res, dbError: error };
  } else return { schemaError };
};

export const getCurrentUser = async (): Promise<
  DBReturnType<Omit<User, "password" | "id" | "isAdmin" | "updatedAt">>
> => {
  const session = await auth();
  const [res, error] = await safePromise(
    prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: {
        email: true,
        name: true,
        bio: true,
        image: true,
        reputation: true,
        createdAt: true,
        emailVerified: true,
      },
    }),
  );

  return { data: res ?? undefined, dbError: error };
};
