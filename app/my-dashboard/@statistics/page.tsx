import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const UserStatistics = () => {
  return (
    <Card className="w-full sm:w-1/2 overflow-visible p-2">
      <CardHeader className="text-2xl font-semibold">
        User Statistics
      </CardHeader>
      <CardBody className="grid grid-cols-2 grid-rows-2 gap-4 my-2">
        <StatisticSection description="Total Questions Asked" title="10" />
        <StatisticSection description="Total Answers Given" title="25" />
        <StatisticSection description="Total Comments" title="50" />
        <StatisticSection description="Upvotes Received" title="100" />
      </CardBody>
    </Card>
  );
};

export default UserStatistics;

type Props = {
  title: string;
  description: string;
};

const StatisticSection: React.FC<Props> = ({ description, title }) => (
  <div className="flex flex-col items-center">
    <p className="text-2xl font-semibold">{title}</p>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);
