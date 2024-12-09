"use server";

import { ActivityType } from "@prisma/client";

import {
  getActivityLogRelatedData,
  getActivityLogsOfCurrentUser,
} from "@/db/activity-log";
import { OrderType } from "@/types";

export const loadMoreActivities = async (
  page: number,
  pageSize?: number,
  activityType?: ActivityType,
  orderByCreatedAt?: OrderType,
) => {
  const { data } = await getActivityLogsOfCurrentUser(
    page,
    pageSize,
    activityType,
    orderByCreatedAt,
  );

  return data?.results ?? [];
};

export const fetchActivityLogRelatedData: typeof getActivityLogRelatedData =
  async (relatedId, activityType) => {
    return await getActivityLogRelatedData(relatedId, activityType);
  };
