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
import { DbReturnType } from "@/types";
import { auth } from "@/auth";
import { getCurrentUserId } from "@/db/db.utils";

const userSchema = z.object({
  email: emailSchema,
  name: userNameSchema,
  password: passwordSchema,
  bio: optionalString,
  image: optionalString,
});

export const createUser = async (
  data: Prisma.UserCreateInput,
): Promise<DbReturnType<Prisma.UserCreateInput>> => {
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
  DbReturnType<Omit<User, "password" | "id" | "isAdmin" | "updatedAt">>
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

type GetCurrentUserStatistics = {
  totalQuestions: number;
  totalAnswers: number;
  totalComments: number;
  upvoteReceived: number;
};

export const getCurrentUserStatistics = async (): Promise<
  DbReturnType<GetCurrentUserStatistics>
> => {
  const userId = await getCurrentUserId();
  const [totalQuestions, qErr] = await safePromise(
    prisma.question.count({ where: { userId } }),
  );
  const [totalAnswers, aErr] = await safePromise(
    prisma.answer.count({ where: { userId } }),
  );
  const [totalComments, cErr] = await safePromise(
    prisma.comment.count({ where: { userId } }),
  );
  const [upvoteReceived, vErr] = await safePromise(
    prisma.vote.count({
      where: {
        value: 1,
        OR: [{ question: { userId } }, { answer: { userId } }],
      },
    }),
  );

  return {
    data: {
      totalAnswers: totalAnswers ?? 0,
      totalComments: totalComments ?? 0,
      totalQuestions: totalQuestions ?? 0,
      upvoteReceived: upvoteReceived ?? 0,
    },
    dbError: qErr ?? aErr ?? cErr ?? vErr,
  };
};

export const currentUserHasPassword = async (): Promise<
  DbReturnType<boolean>
> => {
  const session = await auth();
  const [res, err] = await safePromise(
    prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: { password: true },
    }),
  );

  return { data: !!res?.password, dbError: err };
};

export const updateUserImage = async (
  image: string | null,
): Promise<DbReturnType<User>> => {
  const session = await auth();
  const [res, err] = await safePromise(
    prisma.user.update({
      where: { email: session?.user?.email ?? "" },
      data: { image },
    }),
  );

  return { data: res, dbError: err };
};
