import { Prisma } from "@prisma/client";
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
