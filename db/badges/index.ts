import { Badge, UserBadge } from "@prisma/client";

import { safePromise } from "@/utils";
import prisma from "@/db";
import { getCurrentUserId } from "@/db/db.utils";
import { DBReturnType } from "@/types";

type GetBadgesOfCurrentUser = UserBadge & { badge: Badge };

export const getBadgesOfCurrentUser = async (): Promise<
  DBReturnType<GetBadgesOfCurrentUser[]>
> => {
  const userId = await getCurrentUserId();
  const [res, error] = await safePromise(
    prisma.userBadge.findMany({ where: { userId }, include: { badge: true } }),
  );

  return { data: res, dbError: error };
};
