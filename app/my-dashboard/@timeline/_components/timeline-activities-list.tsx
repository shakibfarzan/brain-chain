"use client";
import React from "react";
import { Spinner } from "@nextui-org/spinner";

import { InfiniteScroll } from "@/components/basic";
import { loadMoreActivities } from "@/app/my-dashboard/@timeline/actions";
import { getActivityLogsOfCurrentUser } from "@/db/activity-log";
import { ACTIVITIES_PAGE_SIZE } from "@/app/my-dashboard/@timeline/timeline.constans";
import useActivitiesFilterValues from "@/app/my-dashboard/@timeline/_hooks/use-activities-filter-values";
import TimelineActivitySection from "@/app/my-dashboard/@timeline/_components/timeline-activity-section";

type Props = {
  data: Awaited<ReturnType<typeof getActivityLogsOfCurrentUser>>["data"];
};

const TimelineActivitiesList: React.FC<Props> = ({ data }) => {
  const { activityType, orderType } = useActivitiesFilterValues();

  return (
    <InfiniteScroll
      className="h-[65vh]"
      initialData={data?.results ?? []}
      loadMore={async (page, pageSize) =>
        await loadMoreActivities(page, pageSize, activityType, orderType)
      }
      pageSize={ACTIVITIES_PAGE_SIZE}
      renderData={(elements, loading) => {
        return (
          <ol className="relative border-l border-gray-200 dark:border-gray-700 mr-2 ml-4 mt-2">
            {elements?.map((d) => (
              <TimelineActivitySection {...d} key={d.id} />
            ))}
            {loading && <Spinner />}
          </ol>
        );
      }}
      size={20}
      totalCount={data?.count ?? 0}
    />
  );
};

export default TimelineActivitiesList;
