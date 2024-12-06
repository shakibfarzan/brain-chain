"use server";

import { getAnswersOfCurrentUser } from "@/db/answers";

export const loadMoreActivities = async (page: number, pageSize?: number) => {
  const { data } = await getAnswersOfCurrentUser(page, pageSize);

  return data?.results ?? [];
};
