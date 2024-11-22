import { Prisma } from "@prisma/client";
import { z } from "zod";

import { emailSchema, passwordSchema, safePromise } from "@/utils";
import prisma from "@/db";
import { DBReturnType } from "@/types";

const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  bio: z.string().optional(),
  profileImage: z.string().optional(),
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
