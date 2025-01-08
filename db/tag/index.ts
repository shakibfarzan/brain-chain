import { Tag } from "@prisma/client";

import { safePromise } from "@/utils";
import prisma from "@/db";
import { DbReturnType } from "@/types";

export const getAllTags = async (): Promise<DbReturnType<Tag[]>> => {
  const [res, error] = await safePromise(prisma.tag.findMany());

  return { data: res, dbError: error };
};
