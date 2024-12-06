"use client";
import React from "react";
import { Spinner } from "@nextui-org/spinner";

import { InfiniteScroll } from "@/components/basic";
import { loadMoreActivities } from "@/app/my-dashboard/@timeline/actions";
import { getAnswersOfCurrentUser } from "@/db/answers";

type Props = {
  data: Awaited<ReturnType<typeof getAnswersOfCurrentUser>>["data"];
};

const TimelineActivitiesList: React.FC<Props> = ({ data }) => {
  return (
    <InfiniteScroll
      className="h-96"
      initialData={data?.results ?? []}
      loadMore={loadMoreActivities}
      pageSize={10}
      renderData={(data, loading) => {
        return (
          <div className="flex flex-col gap-4 justify-center">
            {data?.map((d) => (
              <div key={d.id} className="w-full">
                {d.content}
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
