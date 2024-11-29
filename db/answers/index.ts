import { Answer, Question, Vote } from "@prisma/client";

import { getCurrentUserId } from "@/db/db.utils";
import { safePromise } from "@/utils";
import prisma from "@/db";
import { DBReturnType } from "@/types";

type GetAnswersOfCurrentUser = Answer & {
  question: Question;
  votes: Vote[];
};

export const getAnswersOfCurrentUser = async (): Promise<
  DBReturnType<GetAnswersOfCurrentUser[]>
> => {
  const userId = await getCurrentUserId();
  const [res, error] = await safePromise(
    prisma.answer.findMany({
      include: { votes: true, question: true },
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  );

  return { data: res, dbError: error };
};
