import { ActivityLog, ActivityType } from "@prisma/client";

import { getCurrentUserId } from "@/db/db.utils";
import prisma from "@/db";
import { safePromise } from "@/utils";
import { DbReturnType } from "@/types";
import { PaginatedReturnType } from "@/types/db-return-type";

export const getActivityLogsOfCurrentUser = async (
  page?: number,
  pageSize?: number,
  activityType?: ActivityType,
  orderByCreatedAt?: "asc" | "desc",
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
