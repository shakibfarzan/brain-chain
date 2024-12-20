import React from "react";
import { CardBody, CardHeader } from "@nextui-org/card";
import { ActivityType } from "@prisma/client";

import TimelineFilters from "@/app/my-dashboard/@timeline/_components/timeline-filters";
import TimelineActivitiesList from "@/app/my-dashboard/@timeline/_components/timeline-activities-list";
import { getActivityLogsOfCurrentUser } from "@/db/activity-log";
import { PropsWithParams } from "@/types/app-params";
import { SEARCH_PARAMS_KEYS } from "@/config/constants";
import { OrderType } from "@/types";
import { ACTIVITIES_PAGE_SIZE } from "@/app/my-dashboard/@timeline/timeline.constans";
import { CardPagePaper } from "@/components/basic";

const ActivityTimeline = async ({ searchParams }: PropsWithParams) => {
  const {
    [SEARCH_PARAMS_KEYS.ACTIVITY_TYPE]: activityType,
    [SEARCH_PARAMS_KEYS.ACTIVITY_LOG_ORDER]: orderByCreatedAt,
  } = await searchParams;

  const { data } = await getActivityLogsOfCurrentUser(
    1,
    ACTIVITIES_PAGE_SIZE,
    activityType ? (activityType.toString() as ActivityType) : undefined,
    orderByCreatedAt ? (orderByCreatedAt.toString() as OrderType) : undefined,
  );

  return (
    <CardPagePaper>
      <CardHeader className="text-2xl font-semibold">
        Activity Timeline
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <TimelineFilters />
        <TimelineActivitiesList data={data} />
      </CardBody>
    </CardPagePaper>
  );
};

export default ActivityTimeline;
