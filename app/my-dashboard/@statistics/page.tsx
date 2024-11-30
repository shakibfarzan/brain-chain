import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { getCurrentUserStatistics } from "@/db/user";
// bg-gradient-to-br to-70% from-primary-200 to-secondary-200
const UserStatistics = async () => {
  const { data } = await getCurrentUserStatistics();

  return (
    <Card className="w-full sm:w-1/2 overflow-visible p-2">
      <CardHeader className="text-2xl font-semibold">
        User Statistics
      </CardHeader>
      <CardBody className="grid grid-cols-2 grid-rows-2 gap-4 my-2">
        <StatisticSection
          description="Total Questions Asked"
          title={data?.totalQuestions.toString() ?? ""}
        />
        <StatisticSection
          description="Total Answers Given"
          title={data?.totalAnswers.toString() ?? ""}
        />
        <StatisticSection
          description="Total Comments"
          title={data?.totalComments.toString() ?? ""}
        />
        <StatisticSection
          description="Upvotes Received"
          title={data?.upvoteReceived.toString() ?? ""}
        />
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
