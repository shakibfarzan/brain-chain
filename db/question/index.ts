import { Answer, Question, Vote } from "@prisma/client";

import { DbReturnType } from "@/types";
import prisma from "@/db";
import { generateSlug, safePromise } from "@/utils";
import { getCurrentUserId } from "@/db/db.utils";
import { PaginatedReturnType } from "@/types/db-return-type";

type GetQuestionsOfCurrentUser = Question & {
  answers: Answer[];
  votes: Vote[];
};

export const getQuestionsOfCurrentUser = async (
  page?: number,
  pageSize?: number,
): Promise<DbReturnType<PaginatedReturnType<GetQuestionsOfCurrentUser>>> => {
  const skip = page && pageSize ? (page - 1) * pageSize : undefined;
  const userId = await getCurrentUserId();
  const resultsPromise = prisma.question.findMany({
    include: { answers: true, votes: true },
    where: { userId },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });
  const countPromise = prisma.question.count({ where: { userId } });

  const [res, error] = await safePromise(
    Promise.all([resultsPromise, countPromise]),
  );

  return {
    data: { results: res?.[0] ?? [], count: res?.[1] ?? 0 },
    dbError: error,
  };
};

const generateUniqueSlug = async (title: string) => {
  let slug = generateSlug(title);
  let uniqueSlug = slug;
  let count = 1;

  while (true) {
    const [res] = await safePromise(
      prisma.question.findUnique({ where: { slug: uniqueSlug } }),
    );

    if (!res) break;

    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  return uniqueSlug;
};

type CreateQuestionInput = {
  title: string;
  description: string;
  tags: string[];
};

export const createQuestion = async ({
  title,
  tags,
  description,
}: CreateQuestionInput): Promise<DbReturnType<Question>> => {
  const userId = (await getCurrentUserId()) ?? "";
  const slug = await generateUniqueSlug(title);

  const [res, err] = await safePromise(
    prisma.question.create({
      data: {
        title,
        description,
        slug,
        userId,
        tags: {
          connect: tags.map((tag) => ({
            id: tag,
          })),
        },
      },
    }),
  );

  return { data: res, dbError: err };
};
