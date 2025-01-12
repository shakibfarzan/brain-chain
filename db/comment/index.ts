import { Comment, Question } from "@prisma/client";

import { getAnswerById } from "../answer";

import { getCurrentUserId } from "@/db/db.utils";
import { safePromise } from "@/utils";
import prisma from "@/db";
import { DbReturnType } from "@/types";
import { PaginatedReturnType } from "@/types/db-return-type";

type GetCommentsOfCurrentUser = Comment & {
  question: Question | null;
  answer: {
    content: string;
    question: { slug: string; title: string };
    id: string;
  } | null;
};

export const getCommentsOfCurrentUser = async (
  page?: number,
  pageSize?: number,
): Promise<DbReturnType<PaginatedReturnType<GetCommentsOfCurrentUser>>> => {
  const skip = page && pageSize ? (page - 1) * pageSize : undefined;
  const userId = await getCurrentUserId();
  const resultsPromise = prisma.comment.findMany({
    include: {
      question: true,
    },
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });
  const countPromise = prisma.comment.count({ where: { userId } });
  const [res, error] = await safePromise(
    Promise.all([resultsPromise, countPromise]),
  );

  const comments: GetCommentsOfCurrentUser[] = [];

  for (const comment of res?.[0] ?? []) {
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

  return { data: { results: comments, count: res?.[1] ?? 0 }, dbError: error };
};
