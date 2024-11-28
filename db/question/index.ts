import { Answer, Question, Vote } from "@prisma/client";

import { DBReturnType } from "@/types";
import { auth } from "@/auth";
import prisma from "@/db";
import { safePromise } from "@/utils";

type GetQuestionsOfCurrentUser = Question & {
  answers: Answer[];
  votes: Vote[];
};

export const getQuestionsOfCurrentUser = async (): Promise<
  DBReturnType<GetQuestionsOfCurrentUser[]>
> => {
  const session = await auth();
  const [user] = await safePromise(
    prisma.user.findUnique({
      where: { email: session?.user?.email ?? "" },
      select: { id: true },
    }),
  );

  const [res, error] = await safePromise(
    prisma.question.findMany({
      include: { answers: true, votes: true },
      where: { userId: user?.id },
    }),
  );

  return { data: res ?? undefined, dbError: error };
};
