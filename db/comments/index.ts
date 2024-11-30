import { Comment, Question } from "@prisma/client";

import { getCurrentUserId } from "@/db/db.utils";
import { safePromise } from "@/utils";
import prisma from "@/db";
import { DBReturnType } from "@/types";
import { getAnswerById } from "@/db/answers";

type GetCommentsOfCurrentUser = Comment & {
  question: Question | null;
  answer: {
    content: string;
    question: { slug: string; title: string };
    id: string;
  } | null;
};

export const getCommentsOfCurrentUser = async (): Promise<
  DBReturnType<GetCommentsOfCurrentUser[]>
> => {
  const userId = await getCurrentUserId();
  const [res, error] = await safePromise(
    prisma.comment.findMany({
      include: {
        question: true,
      },
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  );

  const comments: GetCommentsOfCurrentUser[] = [];

  for (const comment of res ?? []) {
    let answer;

    if (comment.answerId) {
      answer = await getAnswerById(comment.answerId);
    }
    comments.push({
      ...comment,
      answer: answer?.data
        ? {
            question: {
              slug: answer.data.question.slug,
              title: answer.data.question.title,
            },
            id: answer.data.id,
            content: answer.data.content,
          }
        : null,
    });
  }

  return { data: comments, dbError: error };
};
