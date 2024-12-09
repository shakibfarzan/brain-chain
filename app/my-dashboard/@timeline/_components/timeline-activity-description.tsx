"use client";
import React, { useMemo } from "react";
import { ActivityLog } from "@prisma/client";
import Link from "next/link";
import clsx from "clsx";

import { useFetchData, useReplaceParams } from "@/hooks";
import { fetchActivityLogRelatedData } from "@/app/my-dashboard/@timeline/actions";
import routes from "@/config/routes";
import { SEARCH_PARAMS_KEYS } from "@/config/constants";

const TimelineActivityDescription: React.FC<
  Pick<ActivityLog, "description" | "relatedId" | "activityType">
> = ({ description, relatedId, activityType }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { manual } = useReplaceParams();
  const { data } = useFetchData(fetchActivityLogRelatedData, {
    args: [relatedId ?? "", activityType],
    loadCondition: isHovered,
  });

  const searchParams = useMemo<Record<string, string>>(() => {
    const res: Record<string, string> = {};

    if (data?.answerId) res[SEARCH_PARAMS_KEYS.ANSWER_ID] = data.answerId;
    if (data?.commentId) res[SEARCH_PARAMS_KEYS.COMMENT_ID] = data.commentId;

    return res;
  }, [data]);

  const commonClassName = "text-lg font-semibold text-gray-900 dark:text-white";

  return !data?.questionSlug ? (
    <h3 className={commonClassName} onMouseEnter={() => setIsHovered(true)}>
      {description}
    </h3>
  ) : (
    <Link
      className={clsx(
        commonClassName,
        "hover:underline underline-offset-2 transition",
      )}
      href={manual(routes.QUESTIONS.DETAIL, {
        params: [data?.questionSlug],
        searchParams,
        approach: "set",
      })}
    >
      {description}
    </Link>
  );
};

export default TimelineActivityDescription;
