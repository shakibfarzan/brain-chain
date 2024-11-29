import { Answer, Question, Vote } from "@prisma/client";

import { DBReturnType } from "@/types";
import prisma from "@/db";
import { safePromise } from "@/utils";
import { getCurrentUserId } from "@/db/db.utils";

type GetQuestionsOfCurrentUser = Question & {
  answers: Answer[];
  votes: Vote[];
};

export const getQuestionsOfCurrentUser = async (): Promise<
  DBReturnType<GetQuestionsOfCurrentUser[]>
> => {
  const userId = await getCurrentUserId();

  const [res, error] = await safePromise(
    prisma.question.findMany({
      include: { answers: true, votes: true },
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  );

  return { data: res ?? undefined, dbError: error };
};
