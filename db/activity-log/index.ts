import { ActivityLog, ActivityType, Prisma } from "@prisma/client";
import { format } from "date-fns";

import { getCurrentUserId } from "@/db/db.utils";
import prisma from "@/db";
import { safePromise } from "@/utils";
import { DbReturnType, OrderType } from "@/types";
import { PaginatedReturnType } from "@/types/db-return-type";
import { DATETIME_FORMATS } from "@/config/constants";

export const getActivityLogsOfCurrentUser = async (
  page?: number,
  pageSize?: number,
  activityType?: ActivityType,
  orderByCreatedAt?: OrderType,
): Promise<DbReturnType<PaginatedReturnType<ActivityLog>>> => {
  const skip = page && pageSize ? (page - 1) * pageSize : undefined;
  const userId = await getCurrentUserId();
  const resultsPromise = prisma.activityLog.findMany({
    where: { userId, activityType },
    orderBy: { createdAt: orderByCreatedAt },
    skip,
    take: pageSize,
  });
  const countPromise = prisma.activityLog.count({
    where: { userId, activityType },
  });
  const [res, error] = await safePromise(
    Promise.all([resultsPromise, countPromise]),
  );

  return {
    data: { results: res?.[0] ?? [], count: res?.[1] ?? 0 },
    dbError: error,
  };
};

type GetActivityLogRelatedData = {
  questionSlug?: string;
  answerId?: string;
  commentId?: string;
};

export const getActivityLogRelatedData = async (
  relatedId: string,
  activityType: ActivityType,
): Promise<GetActivityLogRelatedData> => {
  if (questionTypes.includes(activityType)) {
    const [res] = await safePromise(
      prisma.question.findUnique({
        where: { id: relatedId },
      }),
    );

    return { questionSlug: res?.slug };
  } else if (answerTypes.includes(activityType)) {
    const [res] = await safePromise(
      prisma.answer.findUnique({
        where: { id: relatedId },
        include: { question: true },
      }),
    );

    return { questionSlug: res?.question.slug, answerId: res?.id };
  } else if (voteTypes.includes(activityType)) {
    const [res] = await safePromise(
      prisma.vote.findUnique({
        where: { id: relatedId },
        include: { question: true, answer: { include: { question: true } } },
      }),
    );

    return {
      questionSlug: res?.question?.slug ?? res?.answer?.question?.slug,
      answerId: res?.answerId ?? undefined,
    };
  } else if (commentTypes.includes(activityType)) {
    const [res] = await safePromise(
      prisma.comment.findUnique({
        where: { id: relatedId },
        include: { question: true, answer: { include: { question: true } } },
      }),
    );

    return {
      questionSlug: res?.question?.slug ?? res?.answer?.question?.slug,
      answerId: res?.answerId ?? undefined,
      commentId: res?.id,
    };
  }

  return {};
};

const questionTypes: ActivityType[] = ["QUESTION_POSTED"];
const answerTypes: ActivityType[] = ["ANSWER_ACCEPTED", "ANSWER_POSTED"];
const voteTypes: ActivityType[] = ["QUESTION_UPVOTED", "ANSWER_UPVOTED"];
const commentTypes: ActivityType[] = ["COMMENT_POSTED"];

export const createUserRegisteredActivity = async (
  userId: string,
): Promise<DbReturnType<Omit<Prisma.ActivityLogCreateInput, "user">>> => {
  const [res, err] = await safePromise(
    prisma.activityLog.create({
      data: {
        userId,
        activityType: "USER_REGISTERED",
        description: `User registered on ${format(new Date(), DATETIME_FORMATS.DATE_DASH_SEPARATOR)}`,
      },
    }),
  );

  return { data: res, dbError: err };
};
