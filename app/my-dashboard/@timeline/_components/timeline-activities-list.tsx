"use client";
import React from "react";
import { Spinner } from "@nextui-org/spinner";

import { InfiniteScroll } from "@/components/basic";
import { loadMoreActivities } from "@/app/my-dashboard/@timeline/actions";
import { getActivityLogsOfCurrentUser } from "@/db/activity-log";
import { ACTIVITIES_PAGE_SIZE } from "@/app/my-dashboard/@timeline/timeline.constans";
import useActivitiesFilterValues from "@/app/my-dashboard/@timeline/_hooks/use-activities-filter-values";

type Props = {
  data: Awaited<ReturnType<typeof getActivityLogsOfCurrentUser>>["data"];
};

const TimelineActivitiesList: React.FC<Props> = ({ data }) => {
  const { activityType, orderType } = useActivitiesFilterValues();

  return (
    <InfiniteScroll
      className="h-96"
      initialData={data?.results ?? []}
      loadMore={async (page, pageSize) =>
        await loadMoreActivities(page, pageSize, activityType, orderType)
      }
      pageSize={ACTIVITIES_PAGE_SIZE}
      renderData={(data, loading) => {
        return (
          <div className="flex flex-col gap-4 justify-center">
            {data?.map((d) => (
              <div key={d.id} className="w-full">
                {d.description}
              </div>
            ))}
            {loading && <Spinner />}
          </div>
        );
      }}
      size={20}
      totalCount={data?.count ?? 0}
    />
  );
};

export default TimelineActivitiesList;
