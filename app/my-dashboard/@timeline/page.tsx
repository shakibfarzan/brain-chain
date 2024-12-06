import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import TimelineFilters from "@/app/my-dashboard/@timeline/_components/timeline-filters";
import { getAnswersOfCurrentUser } from "@/db/answers";
import TimelineActivitiesList from "@/app/my-dashboard/@timeline/_components/timeline-activities-list";

const ActivityTimeline = async () => {
  const { data } = await getAnswersOfCurrentUser(1, 10);

  return (
    <Card isBlurred className="shadow-small p-2 w-full">
      <CardHeader className="text-2xl font-semibold">
        Activity Timeline
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <TimelineFilters />
        <TimelineActivitiesList data={data} />
      </CardBody>
    </Card>
  );
};

export default ActivityTimeline;
