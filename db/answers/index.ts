import { Answer, Question, Vote } from "@prisma/client";

import { getCurrentUserId } from "@/db/db.utils";
import { safePromise } from "@/utils";
import prisma from "@/db";
import { DbReturnType } from "@/types";
import { PaginatedReturnType } from "@/types/db-return-type";

type GetAnswersOfCurrentUser = Answer & {
  question: Question;
  votes: Vote[];
};

export const getAnswersOfCurrentUser = async (
  page?: number,
  pageSize?: number,
): Promise<DbReturnType<PaginatedReturnType<GetAnswersOfCurrentUser>>> => {
  const skip = page && pageSize ? (page - 1) * pageSize : undefined;
  const userId = await getCurrentUserId();
  const resultsPromise = prisma.answer.findMany({
    include: { votes: true, question: true },
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });
  const countPromise = prisma.answer.count({ where: { userId } });
  const [res, error] = await safePromise(
    Promise.all([resultsPromise, countPromise]),
  );

  return {
    data: { results: res?.[0] ?? [], count: res?.[1] ?? 0 },
    dbError: error,
  };
};

export const getAnswerById = async (
  id: string,
): Promise<DbReturnType<Omit<GetAnswersOfCurrentUser, "votes">>> => {
  const [res, error] = await safePromise(
    prisma.answer.findUnique({
      include: { question: true },
      where: { id },
    }),
  );

  return { data: res ?? undefined, dbError: error };
};
