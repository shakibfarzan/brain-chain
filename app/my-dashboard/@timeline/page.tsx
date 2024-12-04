import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import TimelineFilters from "@/app/my-dashboard/@timeline/_components/timeline-filters";

const ActivityTimeline = () => {
  return (
    <Card isBlurred className="shadow-small p-2 w-full">
      <CardHeader className="text-2xl font-semibold">
        Activity Timeline
      </CardHeader>
      <CardBody>
        <TimelineFilters />
      </CardBody>
    </Card>
  );
};

export default ActivityTimeline;
